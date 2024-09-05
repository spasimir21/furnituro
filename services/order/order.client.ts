import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';

const ORDER_CLIENT = Symbol('$OrderClient');

interface OrderClient {}

// TODO: Add credentials
const OrderClientModule = ClientsModule.register([
  {
    name: ORDER_CLIENT,
    transport: Transport.GRPC,
    options: {
      package: 'order',
      protoPath: './proto/order.proto',
      url: `furnituro-order:${process.env.SERVICE_PORT}`
    }
  }
]);

const getOrderClient = (client: ClientGrpc) => client.getService<OrderClient>('OrderService');

export { ORDER_CLIENT, OrderClientModule, OrderClient, getOrderClient };

