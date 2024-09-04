import { ServiceTokenController, TokenService } from '@libs/server/token';
import { SharedConfigProvider } from '@shared/server/sharedConfig';
import { AuthClientModule } from '@services/auth/auth.client';
import { UserGRPCController } from './user.grpc.controller';
import { UserHTTPController } from './user.http.controller';
import { PrismaService } from '@libs/server/prisma';
import { UserConfigProvider } from './config';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthClientModule],
  controllers: [ServiceTokenController, UserHTTPController, UserGRPCController],
  providers: [SharedConfigProvider, TokenService, UserConfigProvider, PrismaService, UserService]
})
class UserModule {}

export { UserModule };
