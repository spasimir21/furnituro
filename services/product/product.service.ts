import { PrismaService } from '@libs/server/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { ProductConfig } from './config';

@Injectable()
class ProductService {
  constructor(
    @Inject(ProductConfig) private readonly config: ProductConfig,
    private readonly prismaService: PrismaService
  ) {}
}

export { ProductService };

