import { ConfigProvider, ConfigSymbol } from '@libs/server/config';

interface UserConfig {}

const UserConfig = ConfigSymbol('user');

const UserConfigProvider = ConfigProvider('./config/user.yml', UserConfig);

export { UserConfig, UserConfigProvider };
