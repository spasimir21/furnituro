import { AUTH_CLIENT, AuthClient, getAuthClient } from '@services/auth/auth.client';
import { Controller, Inject, Post, Req, Res } from '@nestjs/common';
import { unwrapResultInController } from '../utils/controllerUtils';
import { wrapResultAsync } from '@libs/shared/utils/result';
import { SharedConfig } from '@shared/server/sharedConfig';
import { TokenData } from '@services/auth/interface/tokenData.interface';
import { ClientGrpc } from '@nestjs/microservices';
import { TokenService } from './token.service';
import { firstValueFrom } from 'rxjs';

@Controller()
class ServiceTokenController {
  private authClient: AuthClient = null as any;

  constructor(
    @Inject(SharedConfig) private readonly sharedConfig: SharedConfig,
    @Inject(AUTH_CLIENT) private readonly authGrpcClient: ClientGrpc,
    private readonly tokenService: TokenService
  ) {}

  onModuleInit() {
    this.authClient = getAuthClient(this.authGrpcClient);
  }

  @Post('/token')
  async generateServiceToken(@Req() req: any, @Res() res: any) {
    unwrapResultInController(
      await wrapResultAsync(async () => {
        const authorizationHeader = req.headers.authorization as string | undefined;
        if (authorizationHeader == null) throw new Error('No authentication token provided!');

        const [method, token] = authorizationHeader.split(' ');
        if (token == null || method.toLowerCase() !== 'bearer') throw new Error('No authentication token provided!');

        const { isValid } = await firstValueFrom(this.authClient.verifyToken({ token }));
        if (!isValid) throw new Error('Authentication token is invalid!');

        const tokenData = this.tokenService.decode<any>(token);
        delete tokenData.exp;
        delete tokenData.iat;

        return this.tokenService.sign(tokenData, this.sharedConfig.serviceToken.expiresIn);
      }),
      res,
      403
    );
  }
}

export { ServiceTokenController };
