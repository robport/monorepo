import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MariaDbService } from '../db/maria-db.service';
import { AuthError, User } from '@monorepo/data';

@Injectable()
export class UsersService {

  constructor(private db: MariaDbService) {
  }

  async findByEmail(email: string): Promise<User | undefined> {
    let conn = await this.db.getConnection();
    const result = await conn.query(
      `SELECT id, email, password
            FROM users
            WHERE email='${email}'`);
    return result[0];
  }

  async findById(userId: number): Promise<User | undefined> {
    let conn = await this.db.getConnection();
    const result = await conn.query(
      `SELECT id, email, password
            FROM users
            WHERE id=${userId}`);
    return result[0];
  }

  async create(email: string, password: string) {
    if ( await this.findByEmail(email)) {
      throw new HttpException(AuthError.EMAIL_ALREADY_REGISTERED, HttpStatus.UNAUTHORIZED);
    }

    let conn = await this.db.getConnection();
    const result = await conn.query(
      `INSERT INTO users ( email, password )
            VALUES ( ?, ? )`,
      [ email, password ]
    )
  }

  async setLoggedIn(userId: string) {
  }

  async setLoggedOut(userId: string) {
  }
}
