import { ConfigProvider, ConfigSymbol } from '@libs/server/config';

interface ProductConfig {}

const ProductConfig = ConfigSymbol('product');

const ProductConfigProvider = ConfigProvider('./config/product.yml', ProductConfig);

export { ProductConfig, ProductConfigProvider };

