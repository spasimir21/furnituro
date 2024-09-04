import { wrapResultAsync } from '@libs/shared/utils/result';
import { EmailRegisterDto } from '../dto/emailRegister.dto';
import { GoogleOAuthData } from './google.oauth.service';
import { EmailLoginDto } from '../dto/emailLogin.dto';
import { PrismaService } from '@libs/server/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { UserInfoDto } from '../dto/userInfo.dto';
import { AuthProvider } from '@prisma/client';
import { id } from '@libs/shared/utils';
import { AuthConfig } from '../config';
import * as bcrypt from 'bcrypt';

@Injectable()
class UserService {
  constructor(
    @Inject(AuthConfig) private readonly authConfig: AuthConfig,
    private readonly prismaService: PrismaService
  ) {}

  async createOrGetUserWithGoogle(data: GoogleOAuthData) {
    return wrapResultAsync(
      async () =>
        await this.prismaService.user.upsert({
          where: {
            id: data.id,
            authProvider: AuthProvider.GOOGLE
          },
          update: {},
          create: {
            id: data.id,
            authProvider: AuthProvider.GOOGLE,
            email: data.email,
            password: null,
            fullname: data.name,
            profilePictureURL: data.picture
          }
        })
    );
  }

  createUserWithEmail(data: EmailRegisterDto) {
    return wrapResultAsync(async () => {
      const user = await this.prismaService.user.create({
        data: {
          email: data.email!,
          fullname: data.fullname!,
          authProvider: AuthProvider.EMAIL,
          profilePictureURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${id()}`,
          password: await bcrypt.hash(data.password, this.authConfig.password.saltRounds)
        }
      });

      return user;
    });
  }

  async findUserWithEmailCreds(data: EmailLoginDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        authProvider: AuthProvider.EMAIL,
        email: data.email
      }
    });

    if (user == null) return null;

    const isPasswordCorrect = await bcrypt.compare(data.password, user.password!);
    if (!isPasswordCorrect) return null;

    return user;
  }
}

export { UserService };
