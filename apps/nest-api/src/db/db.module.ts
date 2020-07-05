import { Module } from '@nestjs/common';
import { MariaDbService } from './maria-db.service';

@Module({
  providers: [MariaDbService],
  exports: [MariaDbService],
})
export class DbModule {}
