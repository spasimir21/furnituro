import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';

const AUTH_CLIENT = Symbol('$AuthClient');

interface AuthClient {
  verifyToken(request: { token: string }): Observable<{ isValid: boolean }>;
}

// TODO: Add credentials
const AuthClientModule = ClientsModule.register([
  {
    name: AUTH_CLIENT,
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath: './proto/auth.proto',
      url: `furnituro-auth:${process.env.SERVICE_PORT}`
    }
  }
]);

const getAuthClient = (client: ClientGrpc) => client.getService<AuthClient>('AuthService');

export { AUTH_CLIENT, AuthClientModule, AuthClient, getAuthClient };

