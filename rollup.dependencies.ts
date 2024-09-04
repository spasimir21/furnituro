import nodePolyfills from 'rollup-plugin-polyfill-node';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { RollupOptions } from 'rollup';
import * as path from 'path';
import * as fs from 'fs';

interface DependencyLinker {
  inputPath: string;
  outputPath: string;
  bundlePath: string;
}

const LINKERS: DependencyLinker[] = [
  {
    inputPath: './dependencies/frontend.json',
    outputPath: './dist/dependencies_node.js',
    bundlePath: './dist/dependencies.js'
  }
];

function createDependencyLinkerEntry(linker: DependencyLinker) {
  const dependencies = JSON.parse(fs.readFileSync(linker.inputPath).toString());
  let output = '';

  const allDeps = [...dependencies.esModules, ...dependencies.commonJsModules];
  for (let i = 0; i < allDeps.length; i++) output += `import * as _${i} from '${allDeps[i]}';\n`;

  output += `export { ${allDeps.map((_, i) => `_${i}`).join(', ')} };\n`;

  fs.mkdirSync(path.dirname(linker.outputPath), { recursive: true });
  fs.writeFileSync(linker.outputPath, output);
}

const configForDependencyLinker = (linker: DependencyLinker): RollupOptions => {
  createDependencyLinkerEntry(linker);

  return {
    input: linker.outputPath,
    output: {
      file: linker.bundlePath,
      format: 'esm'
    },
    plugins: [commonjs(), nodeResolve({ browser: true }), nodePolyfills()],
    treeshake: false
  };
};

const CONFIG = LINKERS.map(configForDependencyLinker);

export default CONFIG;
