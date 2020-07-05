import { Injectable, Logger } from '@nestjs/common';
import { Connection, createConnection } from 'mariadb';

@Injectable()
export class MariaDbService {
  conn: Connection;
  logger = new Logger('MariaDbService');

  async getConnection(): Promise<Connection> {
    if (!this.conn || !this.conn.isValid()) {
      const defaultHostUrl = 'mariadb://system:system@localhost/personal';
      const hostUrl = process.env.MARIA_DB_URL || defaultHostUrl;
      this.logger.log(`Create Connection to Maria DB`);
      this.conn = await createConnection(hostUrl);
      this.logger.log(`Connection created`);
      this.conn.on('error', async err => {
        this.logger.error(err, 'Error event received');
        this.conn = null;
      });
    }
    return this.conn;
  }
}
