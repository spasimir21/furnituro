import { ConfigProvider, ConfigSymbol } from '@libs/server/config';

interface SSRConfig {
  indexHtmlDist: string;
}

const SSRConfig = ConfigSymbol('ssr');

const SSRConfigProvider = ConfigProvider('./config/ssr.yml', SSRConfig);

export { SSRConfig, SSRConfigProvider };
