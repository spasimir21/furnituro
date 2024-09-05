import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';

const FEEDBACK_CLIENT = Symbol('$FeedbackClient');

interface FeedbackClient {}

// TODO: Add credentials
const FeedbackClientModule = ClientsModule.register([
  {
    name: FEEDBACK_CLIENT,
    transport: Transport.GRPC,
    options: {
      package: 'feedback',
      protoPath: './proto/feedback.proto',
      url: `furnituro-feedback:${process.env.SERVICE_PORT}`
    }
  }
]);

const getFeedbackClient = (client: ClientGrpc) => client.getService<FeedbackClient>('FeedbackService');

export { FEEDBACK_CLIENT, FeedbackClientModule, FeedbackClient, getFeedbackClient };

