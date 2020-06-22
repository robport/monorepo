import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthError } from '@monorepo/data';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {

  private logger = new Logger('LocalAuthGuard');

  handleRequest(err: any,
                user: any,
                info: any,
                context: any,
                status?: any): any {
    if (err || !user) {
      if (err.message === AuthError.INVALID_PASSWORD || err.message === AuthError.INVALID_USER) {
        throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
      } else {
        this.logger.warn(`Unhandled login failure type ${err.message}`);
        throw new UnauthorizedException();
      }
    }
    return user;
  }
}
