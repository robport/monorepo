import { Module } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { AuctionController } from './auction.controller';
import { UsersModule } from '../users/users.module';
import { AuctionDbService } from './auction.db.service';
import { DbModule } from '../db/db.module';

@Module({
  imports: [UsersModule, DbModule],
  providers: [AuctionService, AuctionDbService],
  controllers: [AuctionController],
  exports: []
})
export class AuctionModule {
}
