import { unwrapResultWithErrorMessage, wrapResultAsync } from '@libs/shared/utils/result';
import { SharedConfig } from '@shared/server/sharedConfig';
import { AuthTokenService } from './auth.token.service';
import { Inject, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthConfig } from '../config';

interface GoogleOAuthData {
  id: string;
  email: string;
  name: string;
  picture: string;
}

@Injectable()
class GoogleOAuthService {
  constructor(
    @Inject(SharedConfig) private readonly sharedConfig: SharedConfig,
    @Inject(AuthConfig) private readonly authConfig: AuthConfig,
    private readonly userService: UserService,
    private readonly authTokenService: AuthTokenService
  ) {}

  private async accessCodeToToken(accessCode: string) {
    const formData = new FormData();
    formData.append('code', accessCode);
    formData.append('client_id', this.authConfig.oauth.googleAppId);
    formData.append('client_secret', process.env.GOOGLE_APP_SECRET!);
    formData.append('redirect_uri', `${this.sharedConfig.publicBaseUrl}/oauth/google`);
    formData.append('grant_type', 'authorization_code');

    const req = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      body: formData
    });

    const data = await req.json();

    return data.access_token as string;
  }

  private async getGoogleUserData(accessToken: string) {
    const googleDataReq = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return (await googleDataReq.json()) as GoogleOAuthData;
  }

  loginUserWithGoogle(accessCode: string) {
    return wrapResultAsync(async () => {
      const accessToken = await this.accessCodeToToken(accessCode);
      if (typeof accessToken !== 'string') throw new Error('Failed to get access code!');

      const googleData = await this.getGoogleUserData(accessToken);
      if (typeof googleData !== 'object') throw new Error('Failed to get google user data!');

      const user = unwrapResultWithErrorMessage(
        await this.userService.createOrGetUserWithGoogle(googleData),
        () => 'Email is already registered!'
      );

      return this.authTokenService.createTokenForUser(user);
    });
  }
}

export { GoogleOAuthService, GoogleOAuthData };
