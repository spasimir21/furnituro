import { Injectable } from '@nestjs/common';
import jsonwebtoken from 'jsonwebtoken';
import { randomBytes } from 'crypto';

const JWT_SECRET_ENV_NAME = 'JWT_SECRET';

@Injectable()
class TokenService {
  private readonly jwtSecret: string;

  constructor() {
    this.jwtSecret = process.env[JWT_SECRET_ENV_NAME] ?? '';
    if (this.jwtSecret.trim().length > 0) return;

    this.jwtSecret = randomBytes(16).toString('hex');
  }

  sign<T extends object>(data: T, expiresIn?: string | number) {
    return jsonwebtoken.sign(data, this.jwtSecret, { expiresIn });
  }

  decode<T extends object>(token: string) {
    return jsonwebtoken.decode(token) as T;
  }

  verify<T>(token: string, ignoreExpiration = false) {
    try {
      return jsonwebtoken.verify(token, this.jwtSecret, { ignoreExpiration }) as T;
    } catch (err) {
      return null;
    }
  }
}

export { TokenService };
