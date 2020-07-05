import { Injectable } from '@nestjs/common';
import { MariaDbService } from '../db/maria-db.service';
import { User } from '@monorepo/data';

@Injectable()
export class UsersService {

  constructor(private db: MariaDbService) {
  }

  async findByEmail(email: string): Promise<User | undefined> {
    let conn = await this.db.getConnection();
    const result = conn.query(
      `SELECT id, email
            FROM users
            WHERE email=${email}`);
    return result[0];
  }

  async findById(userId: number): Promise<User | undefined> {
    let conn = await this.db.getConnection();
    const result = await conn.query(
      `SELECT id, email
            FROM users
            WHERE id=${userId}`);
    return result[0];
  }

  async setLoggedIn(userId: string) {
  }

  async setLoggedOut(userId: string) {
  }
}
