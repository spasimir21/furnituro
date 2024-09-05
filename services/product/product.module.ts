import { ServiceTokenController, TokenService } from '@libs/server/token';
import { ProductGRPCController } from './product.grpc.controller';
import { ProductHTTPController } from './product.http.controller';
import { SharedConfigProvider } from '@shared/server/sharedConfig';
import { AuthClientModule } from '@services/auth/auth.client';
import { ProductService } from './product.service';
import { PrismaService } from '@libs/server/prisma';
import { ProductConfigProvider } from './config';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthClientModule],
  controllers: [ServiceTokenController, ProductHTTPController, ProductGRPCController],
  providers: [SharedConfigProvider, TokenService, ProductConfigProvider, PrismaService, ProductService]
})
class ProductModule {}

export { ProductModule };

