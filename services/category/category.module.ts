import { ServiceTokenController, TokenService } from '@libs/server/token';
import { CategoryGRPCController } from './category.grpc.controller';
import { CategoryHTTPController } from './category.http.controller';
import { SharedConfigProvider } from '@shared/server/sharedConfig';
import { AuthClientModule } from '@services/auth/auth.client';
import { CategoryService } from './category.service';
import { PrismaService } from '@libs/server/prisma';
import { CategoryConfigProvider } from './config';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthClientModule],
  controllers: [ServiceTokenController, CategoryHTTPController, CategoryGRPCController],
  providers: [SharedConfigProvider, TokenService, CategoryConfigProvider, PrismaService, CategoryService]
})
class CategoryModule {}

export { CategoryModule };
