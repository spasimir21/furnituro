import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TokenService } from './token.service';
import { IToken } from './IToken';

function doTokenGuardWork(context: ExecutionContext, tokenService: TokenService, ignoreExpiration = false) {
  const httpContext = context.switchToHttp();
  const request = httpContext.getRequest();

  const authorizationHeader = request.headers.authorization as string | undefined;
  if (authorizationHeader == null) return false;

  const [method, token] = authorizationHeader.split(' ');
  if (token == null || method.toLowerCase() !== 'bearer') return false;

  const tokenData = tokenService.verify<any>(token, ignoreExpiration);
  if (tokenData == null) return false;

  request.token = { raw: token, data: tokenData } satisfies IToken;

  return true;
}

@Injectable()
class TokenGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  canActivate(context: ExecutionContext): boolean {
    return doTokenGuardWork(context, this.tokenService);
  }
}

@Injectable()
class TokenIgnoreExpiredGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  canActivate(context: ExecutionContext): boolean {
    return doTokenGuardWork(context, this.tokenService, true);
  }
}

export { TokenGuard, TokenIgnoreExpiredGuard };
