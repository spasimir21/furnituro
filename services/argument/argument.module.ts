import { ServiceTokenController, TokenService } from '@libs/server/token';
import { ArgumentHTTPController } from './argument.http.controller';
import { ArgumentGRPCController } from './argument.grpc.controller';
import { SharedConfigProvider } from '@shared/server/sharedConfig';
import { AuthClientModule } from '@services/auth/auth.client';
import { ArgumentService } from './argument.service';
import { PrismaService } from '@libs/server/prisma';
import { ArgumentConfigProvider } from './config';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthClientModule],
  controllers: [ServiceTokenController, ArgumentHTTPController, ArgumentGRPCController],
  providers: [SharedConfigProvider, TokenService, ArgumentConfigProvider, PrismaService, ArgumentService]
})
class ArgumentModule {}

export { ArgumentModule };
