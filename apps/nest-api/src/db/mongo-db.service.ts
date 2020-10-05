import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient } from 'mongodb';

@Injectable()
export class MongoDbService {
  client: MongoClient | undefined;
  logger = new Logger('MongoDbService');

  constructor(private configService: ConfigService) {
  }

  async getConnection(): Promise<MongoClient> {
    if (!this.client || !this.client.isConnected()) {
      this.logger.log('Creating new mongo connection');
      const dbUrl = this.configService.get<string>('MONGO_DB_URL');
      this.client = new MongoClient(dbUrl, { useUnifiedTopology: true });
      await this.client.connect();
    } else {
      this.logger.log('Reusing existing mongo connection');
    }
    this.logger.log('Connected', this.client.isConnected().toString());
    return this.client;
  }
}
