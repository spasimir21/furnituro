import { ConfigProvider, ConfigSymbol } from '@libs/server/config';

interface OrderConfig {}

const OrderConfig = ConfigSymbol('order');

const OrderConfigProvider = ConfigProvider('./config/order.yml', OrderConfig);

export { OrderConfig, OrderConfigProvider };

