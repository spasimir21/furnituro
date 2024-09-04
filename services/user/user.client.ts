import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';

const USER_CLIENT = Symbol('$UserClient');

interface UserClient {}

// TODO: Add credentials
const UserClientModule = ClientsModule.register([
  {
    name: USER_CLIENT,
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: './proto/user.proto',
      url: `dialogic-user:${process.env.SERVICE_PORT}`
    }
  }
]);

const getUserClient = (client: ClientGrpc) => client.getService<UserClient>('UserService');

export { USER_CLIENT, UserClientModule, UserClient, getUserClient };
