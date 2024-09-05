import { PrismaService } from '@libs/server/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { OrderConfig } from './config';

@Injectable()
class OrderService {
  constructor(
    @Inject(OrderConfig) private readonly config: OrderConfig,
    private readonly prismaService: PrismaService
  ) {}
}

export { OrderService };

