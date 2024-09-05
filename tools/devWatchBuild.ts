import { createLiveReloadServer } from './liveReloadServer.js';
import { spawn, spawnSync } from 'child_process';
import * as path from 'path';
import ts from 'typescript';
import * as fs from 'fs';

const LIVE_RELOAD_PORT = 4321;

const reloadWebpage = createLiveReloadServer(LIVE_RELOAD_PORT);

fs.rmSync('./dist', { recursive: true, force: true });

spawnSync(
  'node',
  [
    '--max-old-space-size=8192',
    'node_modules/rollup/dist/bin/rollup',
    '-c',
    'rollup.dependencies.ts',
    '--configPlugin',
    '@rollup/plugin-typescript'
  ],
  { stdio: 'inherit' }
);

fs.copyFileSync('./frontend/index.html', './dist/index.html');

const tailwindProcess = spawn('node', [
  'node_modules/tailwindcss/lib/cli.js',
  '-w',
  '-c',
  './tailwind.config.js',
  '-i',
  './frontend/index.css',
  '-o',
  './dist/index.css'
]);

let isUpdateScheduled = false;
let isTailwindDone = false;

tailwindProcess.stderr.on('data', data => {
  console.log(data.toString());

  if (isUpdateScheduled) {
    reloadWebpage();
    isUpdateScheduled = false;
    isTailwindDone = false;
    return;
  }

  isTailwindDone = true;
});

const LINKER_PATH = './dependencies/frontend.json';

const FRONTEND_UPDATE_PATHS = ['frontend', 'libs/client', 'libs/shared', 'shared/client', 'shared/shared'];

const UPDATE_INDICATORS: Record<string, string[]> = {
  './dist/services/auth/track.txt': ['libs/shared', 'libs/server', 'shared/server', 'shared/shared', 'services/auth'],
  './dist/services/image/track.txt': ['libs/shared', 'libs/server', 'shared/server', 'shared/shared', 'services/image'],
  './dist/services/category/track.txt': [
    'libs/shared',
    'libs/server',
    'shared/server',
    'shared/shared',
    'services/category'
  ],
  './dist/services/user/track.txt': ['libs/shared', 'libs/server', 'shared/server', 'shared/shared', 'services/user'],
  './dist/services/rating/track.txt': [
    'libs/shared',
    'libs/server',
    'shared/server',
    'shared/shared',
    'services/rating'
  ],
  './dist/services/ssr/track.txt': ['libs', 'shared' /*, 'frontend'*/, 'services/ssr']
};

function writeUpdateIndicators(filePath: string) {
  const time = Date.now().toString();

  for (const indicator in UPDATE_INDICATORS) {
    let didUpdate = false;

    for (const tracked of UPDATE_INDICATORS[indicator]) {
      if (!filePath.includes(tracked)) continue;
      didUpdate = true;
      break;
    }

    if (!didUpdate) continue;

    try {
      fs.writeFileSync(indicator, time);
    } catch (err) {}
  }
}

function fileExists(filePath: string) {
  try {
    fs.statSync(filePath);
    return true;
  } catch {
    return false;
  }
}

interface DependencyLinker {
  id: Record<string, string>;
  isCommonJs: Record<string, boolean>;
}

function loadDependencyLinker(filePath: string) {
  const linkerConfig = JSON.parse(fs.readFileSync(filePath).toString());
  const linker: DependencyLinker = { id: {}, isCommonJs: {} };

  let i = 0;
  for (const dep of linkerConfig.esModules) {
    linker.id[dep] = `_${i}`;
    linker.isCommonJs[dep] = false;
    i++;
  }

  for (const dep of linkerConfig.commonJsModules) {
    linker.id[dep] = `_${i}`;
    linker.isCommonJs[dep] = true;
    i++;
  }

  return linker;
}

const LINKER = loadDependencyLinker(LINKER_PATH);

function resolveImport(identifier: string, filePath: string, paths: Record<string, string>) {
  for (const from in paths) {
    if (!identifier.startsWith(from)) continue;
    identifier = identifier.replace(from, path.relative(path.dirname(filePath), paths[from]).replaceAll(path.sep, '/'));
    break;
  }

  if (identifier.endsWith('.js')) return identifier;

  const fullPath = path.resolve(path.dirname(filePath), identifier);

  if (fileExists(fullPath + '.ts') || fileExists(fullPath + '.tsx')) return identifier + '.js';
  if (fileExists(fullPath + '/index.ts') || fileExists(fullPath + '/index.tsx')) return identifier + '/index.js';

  return identifier;
}

// import * as $$deps from '/dependencies.js';
const depsImportStatement = (f: ts.NodeFactory) =>
  f.createImportDeclaration(
    void 0,
    f.createImportClause(false, void 0, f.createNamespaceImport(f.createIdentifier('$$deps'))),
    f.createStringLiteral('/dependencies.js'),
    void 0
  );

const propertyChain = (f: ts.NodeFactory, chain: string[]): ts.PropertyAccessExpression =>
  f.createPropertyAccessExpression(
    chain.length === 2 ? f.createIdentifier(chain[0]) : propertyChain(f, chain.slice(0, -1)),
    f.createIdentifier(chain[chain.length - 1])
  );

const constDeclaration = (f: ts.NodeFactory, name: ts.BindingName, initializer: ts.Expression) =>
  f.createVariableStatement(
    void 0,
    f.createVariableDeclarationList(
      [f.createVariableDeclaration(name, void 0, void 0, initializer)],
      ts.NodeFlags.Const
    )
  );

function transformLinkedImport(
  f: ts.NodeFactory,
  importNode: ts.ImportDeclaration,
  depId: string,
  isCommonJs: boolean
): ts.Node[] {
  const clause = importNode.importClause;
  if (clause == null) return [];

  const defaultImport = clause.name ?? null;

  let namedImports: [ts.Identifier, ts.Identifier][] | null = null;
  let starImport: ts.Identifier | null = null;

  if (clause.namedBindings != null) {
    if (ts.isNamespaceImport(clause.namedBindings)) starImport = clause.namedBindings.name;
    else
      namedImports = clause.namedBindings.elements.map(specifier => [
        specifier.propertyName ?? specifier.name,
        specifier.name
      ]);
  }

  let chain = ['$$deps', depId];
  if (isCommonJs) chain.push('default');

  return [
    defaultImport && constDeclaration(f, defaultImport, propertyChain(f, isCommonJs ? chain : [...chain, 'default'])),
    starImport && constDeclaration(f, starImport, propertyChain(f, chain)),
    namedImports &&
      constDeclaration(
        f,
        f.createObjectBindingPattern(namedImports.map(([a, b]) => f.createBindingElement(void 0, a, b, void 0))),
        propertyChain(f, chain)
      )
  ].filter(node => node != null) as ts.Node[];
}

function importTransformer(context: ts.TransformationContext) {
  const options = context.getCompilerOptions();

  const cwd = process.cwd();

  const paths = Object.fromEntries(
    Object.entries(options.paths!).map(([from, [to]]) => [from.replace('/*', ''), path.join(cwd, to.replace('/*', ''))])
  );

  return (sourceFile: ts.SourceFile) => {
    writeUpdateIndicators(sourceFile.fileName);

    for (const part of FRONTEND_UPDATE_PATHS) {
      if (!sourceFile.fileName.includes(part)) continue;

      reloadWebpage();

      if (isTailwindDone) {
        isTailwindDone = false;
        isUpdateScheduled = false;
      } else isUpdateScheduled = true;

      break;
    }

    sourceFile = ts.visitEachChild(
      sourceFile,
      node => {
        if (ts.isExportDeclaration(node)) {
          if (node.moduleSpecifier == null || !ts.isStringLiteral(node.moduleSpecifier)) return node;

          return context.factory.updateExportDeclaration(
            node,
            node.modifiers,
            node.isTypeOnly,
            node.exportClause,
            context.factory.createStringLiteral(resolveImport(node.moduleSpecifier.text, sourceFile.fileName, paths)),
            node.attributes
          );
        }

        if (!ts.isImportDeclaration(node) || node.moduleSpecifier == null || !ts.isStringLiteral(node.moduleSpecifier))
          return node;

        const _module = node.moduleSpecifier.text;

        if (_module in LINKER.id)
          return transformLinkedImport(context.factory, node, LINKER.id[_module], LINKER.isCommonJs[_module]);

        return context.factory.updateImportDeclaration(
          node,
          node.modifiers,
          node.importClause,
          context.factory.createStringLiteral(resolveImport(_module, sourceFile.fileName, paths)),
          node.attributes
        );
      },
      context
    );

    return context.factory.updateSourceFile(sourceFile, [
      depsImportStatement(context.factory),
      ...sourceFile.statements
    ]);
  };
}

const createPatchedProgram = (...args: any[]) => {
  // @ts-ignore
  const program = ts.createEmitAndSemanticDiagnosticsBuilderProgram(...args);

  const __emit = program.emit;

  program.emit = (targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles) =>
    __emit(targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, { after: [importTransformer] });

  return program;
};

const host = ts.createWatchCompilerHost(
  './tsconfig.watch.json',
  {},
  ts.sys,
  createPatchedProgram,
  void 0,
  ({ messageText }) => console.log(messageText)
);

ts.createWatchProgram(host);

