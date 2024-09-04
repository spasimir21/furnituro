import { unwrapResultWithErrorMessage, wrapResultAsync } from '@libs/shared/utils/result';
import { EmailRegisterDto } from '../dto/emailRegister.dto';
import { AuthTokenService } from './auth.token.service';
import { EmailLoginDto } from '../dto/emailLogin.dto';
import { UserService } from './user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
class EmailAuthService {
  constructor(private readonly userService: UserService, private readonly authTokenService: AuthTokenService) {}

  registerUserWithEmail(data: EmailRegisterDto) {
    return wrapResultAsync(async () => {
      const user = unwrapResultWithErrorMessage(
        await this.userService.createUserWithEmail(data),
        () => 'Email is already registered!'
      );

      return this.authTokenService.createTokenForUser(user);
    });
  }

  loginUserWithEmail(data: EmailLoginDto) {
    return wrapResultAsync(async () => {
      const user = await this.userService.findUserWithEmailCreds(data);
      if (user == null) throw new Error('Login info is incorrect!');
      return this.authTokenService.createTokenForUser(user);
    });
  }
}

export { EmailAuthService };
