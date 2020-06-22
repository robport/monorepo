import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthError } from '@monorepo/data';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if ( !user ) {
      throw new HttpException(AuthError.INVALID_USER, HttpStatus.UNAUTHORIZED);
    }
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new HttpException(AuthError.INVALID_PASSWORD, HttpStatus.UNAUTHORIZED);
    }
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    await this.usersService.setLoggedIn(user.username);
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async logout(user: any) {
    await this.usersService.setLoggedOut(user.username);
  }
}
