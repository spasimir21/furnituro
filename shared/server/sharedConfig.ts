import { ConfigProvider, ConfigSymbol } from '@libs/server/config';

interface SharedConfig {
  publicBaseUrl: string;
  serviceToken: {
    expiresIn: string;
  };
}

const SharedConfig = ConfigSymbol('server.shared');

const SharedConfigProvider = ConfigProvider('./config/server.shared.yml', SharedConfig);

export { SharedConfigProvider, SharedConfig };
