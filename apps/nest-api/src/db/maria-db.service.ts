import { Injectable, Logger } from '@nestjs/common';
import { Connection, createConnection } from 'mariadb';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MariaDbService {
  conn: Connection;
  logger = new Logger('MariaDbService');

  constructor(private configService: ConfigService) {
  }

  async getConnection(): Promise<Connection> {
    if (!this.conn || !this.conn.isValid()) {
      const dbUrl = this.configService.get<string>('MARIA_DB_URL');
      this.logger.log(`Create Connection to Maria DB`);
      this.conn = await createConnection(dbUrl);
      this.logger.log(`Connection created`);
      this.conn.on('error', async err => {
        this.logger.error(err, 'Error event received');
        this.conn = null;
      });
    }
    return this.conn;
  }
}
