import { ServiceTokenController, TokenService } from '@libs/server/token';
import { SharedConfigProvider } from '@shared/server/sharedConfig';
import { DebateGRPCController } from './debate.grpc.controller';
import { DebateHTTPController } from './debate.http.controller';
import { AuthClientModule } from '@services/auth/auth.client';
import { PrismaService } from '@libs/server/prisma';
import { DebateService } from './debate.service';
import { DebateConfigProvider } from './config';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthClientModule],
  controllers: [ServiceTokenController, DebateHTTPController, DebateGRPCController],
  providers: [SharedConfigProvider, TokenService, DebateConfigProvider, PrismaService, DebateService]
})
class DebateModule {}

export { DebateModule };
