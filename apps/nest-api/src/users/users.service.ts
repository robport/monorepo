import { Injectable } from '@nestjs/common';
import { MariaDbService } from '../app/maria-db.service';

export interface User {
  id: number;
  username: string;
  password: string;
  loggedIn: boolean;
}

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        id: 1,
        username: 'john',
        password: 'changeme',
        loggedIn: false
      },
      {
        id: 2,
        username: 'chris',
        password: 'secret',
        loggedIn: false
      },
      {
        id: 3,
        username: 'maria',
        password: 'guess',
        loggedIn: false
      }
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
    // let conn = await this.db.getConnection();
    // conn.query('SELECT ')
  }

  async setLoggedIn(username: string) {
    const user = await this.findOne(username);
    user.loggedIn = true;
  }

  async setLoggedOut(username: string) {
    const user = await this.findOne(username);
    user.loggedIn = false;
  }
}
