import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthError } from '@monorepo/data';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  logger = new Logger('JwtAuthGuard');

  handleRequest<User>(err: any,
                      user: User,
                      info: any,
                      context: any,
                      status?: any): User {
    if (err || !user) {
      if (info.message === 'No auth token') {
        throw new HttpException(AuthError.LOGIN_REQUIRED, HttpStatus.UNAUTHORIZED);
      } else if (info.name === 'TokenExpiredError') {
        throw new HttpException(AuthError.SESSION_EXPIRED, HttpStatus.UNAUTHORIZED);
      } else if (info.name === 'JsonWebTokenError') {
        throw new HttpException(AuthError.INVALID_TOKEN, HttpStatus.UNAUTHORIZED);
      } else {
        this.logger.warn(`Unhandled JWT error Name:${info.name} Message:${info.message}`);
        throw new HttpException(AuthError.LOGIN_REQUIRED, HttpStatus.UNAUTHORIZED);
      }
    }
    return user;
  }
}
