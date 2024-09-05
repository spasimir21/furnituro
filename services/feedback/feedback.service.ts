import { PrismaService } from '@libs/server/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { FeedbackConfig } from './config';

@Injectable()
class FeedbackService {
  constructor(
    @Inject(FeedbackConfig) private readonly config: FeedbackConfig,
    private readonly prismaService: PrismaService
  ) {}
}

export { FeedbackService };

