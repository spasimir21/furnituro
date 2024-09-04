import { wrapResultAsync } from '@libs/shared/utils/result';
import { todayPlusDays } from '@libs/shared/utils/date';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/server/prisma';
import { TokenService } from '@libs/server/token';
import { omit } from '@libs/shared/utils/omit';
import { TokenData } from '../interface/tokenData.interface';
import { AuthConfig } from '../config';
import { User } from '@prisma/client';
import { randomBytes } from 'crypto';

interface AuthToken {
  token: string;
  refreshSecret: string;
}

@Injectable()
class AuthTokenService {
  constructor(
    @Inject(AuthConfig) private readonly authConfig: AuthConfig,
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService
  ) {}

  async createTokenForUser(user: User, refreshDateOfDeath?: Date): Promise<AuthToken> {
    const dbToken = await this.prismaService.token.create({
      data: {
        refreshSecret: randomBytes(16).toString('hex'),
        refreshExpiration: todayPlusDays(this.authConfig.refreshToken.expiresInDays),
        refreshDateOfDeath: refreshDateOfDeath ?? todayPlusDays(this.authConfig.refreshToken.daysToDeath),
        userId: user.id
      }
    });

    const tokenData: TokenData = {
      tokenId: dbToken.id,
      userData: omit(user, ['createdAt', 'password'])
    };

    return {
      token: this.tokenService.sign(tokenData, this.authConfig.token.expiresIn),
      refreshSecret: dbToken.refreshSecret
    };
  }

  async refreshToken(tokenId: string, refreshSecret: string, forceRefresh = false) {
    const oldDbToken = await this.prismaService.token.findFirst({
      where: { id: tokenId },
      include: { user: true }
    });

    if (oldDbToken == null) return null;

    await this.deleteToken(oldDbToken.id);

    const now = Date.now();
    if (
      !forceRefresh &&
      (oldDbToken.refreshSecret != refreshSecret ||
        now > oldDbToken.refreshExpiration.getTime() ||
        now > oldDbToken.refreshDateOfDeath.getTime())
    )
      return null;

    return this.createTokenForUser(oldDbToken.user);
  }

  async deleteToken(tokenId: string) {
    return wrapResultAsync(() =>
      this.prismaService.token.delete({
        where: { id: tokenId }
      })
    );
  }
}

export { AuthTokenService, AuthToken };
