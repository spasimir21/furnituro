import { ConfigProvider, ConfigSymbol } from '@libs/server/config';

interface DebateConfig {}

const DebateConfig = ConfigSymbol('debate');

const DebateConfigProvider = ConfigProvider('./config/debate.yml', DebateConfig);

export { DebateConfig, DebateConfigProvider };
