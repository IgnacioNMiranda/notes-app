import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { DecodedUserInfo } from './interfaces';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.getToken(req);
    const userData = await this.verifyToken(token);

    if (userData) {
      req.user = userData;
      return next();
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  getToken(req: Request) {
    const authHeader = req.header('Authorization');
    if (typeof authHeader === 'undefined') {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!authHeader.includes('Bearer')) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = authHeader.replace('Bearer ', '');
    return token;
  }

  async verifyToken(token: string) {
    try {
      const userData = await this.jwtService.verifyAsync<DecodedUserInfo>(
        token,
      );
      return userData;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Your session has expired');
      }
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
