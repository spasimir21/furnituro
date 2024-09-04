import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/server/prisma';
import { ArgumentConfig } from './config';

@Injectable()
class ArgumentService {
  constructor(
    @Inject(ArgumentConfig) private readonly config: ArgumentConfig,
    private readonly prismaService: PrismaService
  ) {}
}

export { ArgumentService };
