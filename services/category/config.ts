import { ConfigProvider, ConfigSymbol } from '@libs/server/config';

interface CategoryConfig {
  categorySearchMaxResultCount: number;
}

const CategoryConfig = ConfigSymbol('category');

const CategoryConfigProvider = ConfigProvider('./config/category.yml', CategoryConfig);

export { CategoryConfig, CategoryConfigProvider };
