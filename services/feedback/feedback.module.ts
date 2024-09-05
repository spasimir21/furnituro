import { ServiceTokenController, TokenService } from '@libs/server/token';
import { FeedbackGRPCController } from './feedback.grpc.controller';
import { FeedbackHTTPController } from './feedback.http.controller';
import { SharedConfigProvider } from '@shared/server/sharedConfig';
import { AuthClientModule } from '@services/auth/auth.client';
import { FeedbackService } from './feedback.service';
import { PrismaService } from '@libs/server/prisma';
import { FeedbackConfigProvider } from './config';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthClientModule],
  controllers: [ServiceTokenController, FeedbackHTTPController, FeedbackGRPCController],
  providers: [SharedConfigProvider, TokenService, FeedbackConfigProvider, PrismaService, FeedbackService]
})
class FeedbackModule {}

export { FeedbackModule };

