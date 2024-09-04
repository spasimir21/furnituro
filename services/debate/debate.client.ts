import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';

const DEBATE_CLIENT = Symbol('$DebateClient');

interface DebateClient {}

// TODO: Add credentials
const DebateClientModule = ClientsModule.register([
  {
    name: DEBATE_CLIENT,
    transport: Transport.GRPC,
    options: {
      package: 'debate',
      protoPath: './proto/debate.proto',
      url: `dialogic-debate:${process.env.SERVICE_PORT}`
    }
  }
]);

const getDebateClient = (client: ClientGrpc) => client.getService<DebateClient>('DebateService');

export { DEBATE_CLIENT, DebateClientModule, DebateClient, getDebateClient };
