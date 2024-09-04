import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';

const ARGUMENT_CLIENT = Symbol('$ArgumentClient');

interface ArgumentClient {}

// TODO: Add credentials
const ArgumentClientModule = ClientsModule.register([
  {
    name: ARGUMENT_CLIENT,
    transport: Transport.GRPC,
    options: {
      package: 'argument',
      protoPath: './proto/argument.proto',
      url: `dialogic-argument:${process.env.SERVICE_PORT}`
    }
  }
]);

const getArgumentClient = (client: ClientGrpc) => client.getService<ArgumentClient>('ArgumentService');

export { ARGUMENT_CLIENT, ArgumentClientModule, ArgumentClient, getArgumentClient };
