import { ConfigProvider, ConfigSymbol } from '@libs/server/config';

interface AuthConfig {
  token: {
    expiresIn: string;
  };
  refreshToken: {
    expiresInDays: number;
    daysToDeath: number;
  };
  password: {
    saltRounds: number;
  };
  oauth: {
    googleAppId: string;
  };
}

const AuthConfig = ConfigSymbol('auth');

const AuthConfigProvider = ConfigProvider('./config/auth.yml', AuthConfig);

export { AuthConfig, AuthConfigProvider };
