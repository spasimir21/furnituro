import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';

const PRODUCT_CLIENT = Symbol('$ProductClient');

interface ProductClient {}

// TODO: Add credentials
const ProductClientModule = ClientsModule.register([
  {
    name: PRODUCT_CLIENT,
    transport: Transport.GRPC,
    options: {
      package: 'product',
      protoPath: './proto/product.proto',
      url: `furnituro-product:${process.env.SERVICE_PORT}`
    }
  }
]);

const getProductClient = (client: ClientGrpc) => client.getService<ProductClient>('ProductService');

export { PRODUCT_CLIENT, ProductClientModule, ProductClient, getProductClient };

