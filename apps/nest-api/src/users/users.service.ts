import { Injectable } from '@nestjs/common';

export interface User {
  userId: number;
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
        userId: 1,
        username: 'john',
        password: 'changeme',
        loggedIn: false
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
        loggedIn: false
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
        loggedIn: false
      }
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
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
