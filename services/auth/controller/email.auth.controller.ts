import { unwrapResultInController } from '@libs/server/utils/controllerUtils';
import { EmailAuthService } from '../service/email.auth.service';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { EmailRegisterDto } from '../dto/emailRegister.dto';
import { EmailLoginDto } from '../dto/emailLogin.dto';
import { UseZodGuard } from 'nestjs-zod';

@Controller('/email')
class EmailAuthController {
  constructor(private readonly emailAuthService: EmailAuthService) {}

  @UseZodGuard('body', EmailLoginDto)
  @Post('/login')
  async login(@Body() data: EmailLoginDto, @Res() res: any) {
    unwrapResultInController(await this.emailAuthService.loginUserWithEmail(data), res);
  }

  @UseZodGuard('body', EmailRegisterDto)
  @Post('/register')
  async register(@Body() data: EmailRegisterDto, @Res() res: any) {
    unwrapResultInController(await this.emailAuthService.registerUserWithEmail(data), res);
  }
}

export { EmailAuthController };
