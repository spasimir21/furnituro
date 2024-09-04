import { PrismaService } from '@libs/server/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { DebateConfig } from './config';

@Injectable()
class DebateService {
  constructor(
    @Inject(DebateConfig) private readonly config: DebateConfig,
    private readonly prismaService: PrismaService
  ) {}
}

export { DebateService };
