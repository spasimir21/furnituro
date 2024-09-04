import { IToken, Token, TokenGuard, TokenIgnoreExpiredGuard } from '@libs/server/token';
import { Body, Controller, Delete, Post, Res, UseGuards } from '@nestjs/common';
import { handleNullInController } from '@libs/server/utils/controllerUtils';
import { AuthTokenService } from '../service/auth.token.service';
import { RefreshSecretDto } from '../dto/refreshSecret.dto';
import { TokenData } from '../interface/tokenData.interface';
import { UseZodGuard } from 'nestjs-zod';

@Controller()
class AuthHTTPController {
  constructor(private readonly authTokenService: AuthTokenService) {}

  @UseZodGuard('body', RefreshSecretDto)
  @UseGuards(TokenIgnoreExpiredGuard)
  @Post('/refresh')
  async refresh(@Body() data: RefreshSecretDto, @Token() token: IToken<TokenData>, @Res() res: any) {
    handleNullInController(
      await this.authTokenService.refreshToken(token.data.tokenId, data.refreshSecret),
      "Couldn't refresh token!",
      res
    );
  }

  @UseGuards(TokenGuard)
  @Delete('/logout')
  async logout(@Token() token: IToken<TokenData>) {
    await this.authTokenService.deleteToken(token.data.tokenId);
  }
}

export { AuthHTTPController };
