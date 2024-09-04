import { PrismaService } from '@libs/server/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { UserConfig } from './config';

@Injectable()
class UserService {
  constructor(@Inject(UserConfig) private readonly config: UserConfig, private readonly prismaService: PrismaService) {}
}

export { UserService };
