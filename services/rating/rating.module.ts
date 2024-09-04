import { ServiceTokenController, TokenService } from '@libs/server/token';
import { SharedConfigProvider } from '@shared/server/sharedConfig';
import { RatingGRPCController } from './rating.grpc.controller';
import { RatingHTTPController } from './rating.http.controller';
import { AuthClientModule } from '@services/auth/auth.client';
import { PrismaService } from '@libs/server/prisma';
import { RatingService } from './rating.service';
import { RatingConfigProvider } from './config';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthClientModule],
  controllers: [ServiceTokenController, RatingHTTPController, RatingGRPCController],
  providers: [SharedConfigProvider, TokenService, RatingConfigProvider, PrismaService, RatingService]
})
class RatingModule {}

export { RatingModule };
