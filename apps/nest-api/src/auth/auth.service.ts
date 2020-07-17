import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthError, User } from '@monorepo/data';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
  }

  private hashPassword(password: string) {
    const secret = this.configService.get<string>('AUTH_SECRET');
    return crypto.createHmac('sha256', secret)
      .update(password)
      .digest('base64');
  }

  async validateUser(email: string, password: string): Promise<User> {
    const hashPassword = this.hashPassword(password);
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new HttpException(AuthError.INVALID_USER, HttpStatus.UNAUTHORIZED);
    }
    if (user && user.password === hashPassword ) {
      return {
        id: user.id,
        email: user.email,
      };
    } else {
      throw new HttpException(AuthError.INVALID_PASSWORD, HttpStatus.UNAUTHORIZED);
    }
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.id  };
    await this.usersService.setLoggedIn(user.email);
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async register(user: User) {
    const hashPassword = this.hashPassword(user.password)
    const { id } = await this.usersService.create(user.email, hashPassword );
    const payload = { username: user.email, sub: id };
    await this.usersService.setLoggedIn(user.email);
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async logout(user: any) {
    if (user) {
      await this.usersService.setLoggedOut(user.username);
    }
  }
}
