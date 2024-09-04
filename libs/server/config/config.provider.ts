import { Provider } from '@nestjs/common';
import { readFile } from 'fs/promises';
import * as yaml from 'yaml';

const ConfigSymbol = (configName: string) => Symbol(`$CONFIG_${configName.toUpperCase()}`);

async function loadConfig<T>(path: string): Promise<T> {
  const source = await readFile(path);
  return yaml.parse(source.toString());
}

function ConfigProvider<T>(path: string, configSymbol: symbol): Provider<Promise<T>> {
  return {
    provide: configSymbol,
    useFactory: () => loadConfig<T>(path)
  };
}

export { ConfigProvider, ConfigSymbol };
