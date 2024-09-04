import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';

const RATING_CLIENT = Symbol('$RatingClient');

interface RatingClient {}

// TODO: Add credentials
const RatingClientModule = ClientsModule.register([
  {
    name: RATING_CLIENT,
    transport: Transport.GRPC,
    options: {
      package: 'rating',
      protoPath: './proto/rating.proto',
      url: `dialogic-rating:${process.env.SERVICE_PORT}`
    }
  }
]);

const getRatingClient = (client: ClientGrpc) => client.getService<RatingClient>('RatingService');

export { RATING_CLIENT, RatingClientModule, RatingClient, getRatingClient };
