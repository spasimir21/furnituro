import { ConfigProvider, ConfigSymbol } from '@libs/server/config';

interface FeedbackConfig {}

const FeedbackConfig = ConfigSymbol('feedback');

const FeedbackConfigProvider = ConfigProvider('./config/feedback.yml', FeedbackConfig);

export { FeedbackConfig, FeedbackConfigProvider };

