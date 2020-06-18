import { Injectable, Logger } from '@nestjs/common';
import { Connection, createConnection } from 'mariadb';

@Injectable()
export class MariaDbService {
  conn: Connection;

  async getConnection(): Promise<Connection> {
    if (!this.conn || !this.conn.isValid()) {
      const defaultHostUrl = 'mariadb://system:system@localhost/personal';
      const hostUrl = process.env.MARIA_DB_URL || defaultHostUrl;
      Logger.log(`Create Connection to Maria DB ${hostUrl}`);
      this.conn = await createConnection(hostUrl);
    }
    return this.conn;
  }
}
