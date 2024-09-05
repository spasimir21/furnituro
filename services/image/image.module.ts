import { ServiceTokenController, TokenService } from '@libs/server/token';
import { SharedConfigProvider } from '@shared/server/sharedConfig';
import { FastifyMulterModule } from '@nest-lab/fastify-multer';
import { AuthClientModule } from '@services/auth/auth.client';
import { ImageHTTPController } from './image.http.controller';
import { ImageGRPCController } from './image.grpc.controller';
import { PrismaService } from '@libs/server/prisma';
import { ImageConfigProvider } from './config';
import { ImageService } from './image.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthClientModule, FastifyMulterModule],
  controllers: [ServiceTokenController, ImageHTTPController, ImageGRPCController],
  providers: [SharedConfigProvider, TokenService, ImageConfigProvider, PrismaService, ImageService]
})
class ImageModule {}

export { ImageModule };

