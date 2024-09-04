import { PrismaService } from '@libs/server/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { RatingConfig } from './config';

@Injectable()
class RatingService {
  constructor(
    @Inject(RatingConfig) private readonly config: RatingConfig,
    private readonly prismaService: PrismaService
  ) {}
}

export { RatingService };
