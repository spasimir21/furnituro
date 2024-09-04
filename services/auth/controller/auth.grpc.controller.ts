import { GrpcMethod } from '@nestjs/microservices';
import { TokenService } from '@libs/server/token';
import { Controller } from '@nestjs/common';
import { of } from 'rxjs';

@Controller()
class AuthGRPCController {
  constructor(private readonly tokenService: TokenService) {}

  @GrpcMethod('AuthService', 'VerifyToken')
  async verifyToken({ token }: { token: string }) {
    return of({
      isValid: this.tokenService.verify(token) != null
    });
  }
}

export { AuthGRPCController };
