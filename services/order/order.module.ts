import { ServiceTokenController, TokenService } from '@libs/server/token';
import { OrderGRPCController } from './order.grpc.controller';
import { OrderHTTPController } from './order.http.controller';
import { SharedConfigProvider } from '@shared/server/sharedConfig';
import { AuthClientModule } from '@services/auth/auth.client';
import { OrderService } from './order.service';
import { PrismaService } from '@libs/server/prisma';
import { OrderConfigProvider } from './config';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthClientModule],
  controllers: [ServiceTokenController, OrderHTTPController, OrderGRPCController],
  providers: [SharedConfigProvider, TokenService, OrderConfigProvider, PrismaService, OrderService]
})
class OrderModule {}

export { OrderModule };

