import { ConfigProvider, ConfigSymbol } from '@libs/server/config';

interface RatingConfig {}

const RatingConfig = ConfigSymbol('rating');

const RatingConfigProvider = ConfigProvider('./config/rating.yml', RatingConfig);

export { RatingConfig, RatingConfigProvider };
