import { ConfigProvider, ConfigSymbol } from '@libs/server/config';

interface ArgumentConfig {}

const ArgumentConfig = ConfigSymbol('argument');

const ArgumentConfigProvider = ConfigProvider('./config/argument.yml', ArgumentConfig);

export { ArgumentConfig, ArgumentConfigProvider };
