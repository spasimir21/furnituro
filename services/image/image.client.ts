import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';

const IMAGE_CLIENT = Symbol('$ImageClient');

interface ImageClient {}

// TODO: Add credentials
const ImageClientModule = ClientsModule.register([
  {
    name: IMAGE_CLIENT,
    transport: Transport.GRPC,
    options: {
      package: 'image',
      protoPath: './proto/image.proto',
      url: `furnituro-image:${process.env.SERVICE_PORT}`
    }
  }
]);

const getImageClient = (client: ClientGrpc) => client.getService<ImageClient>('ImageService');

export { IMAGE_CLIENT, ImageClientModule, ImageClient, getImageClient };

