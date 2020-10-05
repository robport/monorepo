import { Module } from '@nestjs/common';
import { MariaDbService } from './maria-db.service';
import { MongoDbService } from './mongo-db.service';

@Module({
  providers: [MariaDbService, MongoDbService],
  exports: [MariaDbService, MongoDbService],
})
export class DbModule {}
