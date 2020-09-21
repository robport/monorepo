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
    if (this.conn && !this.conn.isValid() ) {
      this.logger.error('Db connection is invalid, try to reconnect....');
      try {
        await this.conn.end();
      } catch ( err ) {
        this.logger.error('Failed to end invalid connection');
      }
    }

    if (!this.conn || !this.conn.isValid()) {
      const dbUrl = this.configService.get<string>('MARIA_DB_URL');
      this.logger.log(`Create Connection to Maria DB`);
      try {
        this.conn = await createConnection(dbUrl);
        this.conn.on('error', async err => {
          this.logger.error(err, 'Error event received');
          this.conn = null;
        });
        this.logger.log(`Connection created`);
      } catch (err) {
        this.logger.error(err, `Failed to create connection`);
        return null;
      }
    }
    return this.conn;
  }
}
