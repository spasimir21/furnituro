import { unwrapResultInController } from '@libs/server/utils/controllerUtils';
import { GoogleOAuthService } from '../service/google.oauth.service';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { AccessCodeDto } from '../dto/accessCode.dto';
import { UseZodGuard } from 'nestjs-zod';

@Controller('/oauth/google')
class GoogleOAuthController {
  constructor(private readonly googleOAuthService: GoogleOAuthService) {}

  @UseZodGuard('body', AccessCodeDto)
  @Post('/')
  async login(@Body() data: AccessCodeDto, @Res() res: any) {
    unwrapResultInController(await this.googleOAuthService.loginUserWithGoogle(data.accessCode), res);
  }
}

export { GoogleOAuthController };
