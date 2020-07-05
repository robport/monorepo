import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Subject } from 'rxjs';
import { ActionResponse, Auction, User } from '@monorepo/data';
import { addSeconds, isBefore } from 'date-fns';
import { Interval } from '@nestjs/schedule';
import { UsersService } from '../users/users.service';
import { AuctionDbService } from './auction.db.service';

@Injectable()
export class AuctionService {

  private logger: Logger = new Logger('Auction Service');

  constructor(private userService: UsersService,
              private auctionDbService: AuctionDbService) {
  }

  @Interval(5000)
  async checkForExpiry() {
    this.logger.debug('Checking for expiry');
    const expiredAuctions = await this.auctionDbService.getExpiredAuctions();

    for (const auction of expiredAuctions) {
      this.logger.log(`Expiring auction: ${auction.name}`);
      await this.auctionDbService.expireAuction(auction.id);
    }
  }

  async createAuction(name: string,
                sellerId: number,
                reservePrice: number,
                expiryInSeconds: number
  ): Promise<ActionResponse> {
    const auctionName = name.toLowerCase();
    const expiryDate = addSeconds(new Date(), expiryInSeconds);
    const seller: User = await this.userService.findById(sellerId);

    if ( !seller ) {
      return {
        success: false,
        reason: `No such seller ${sellerId}`
      }
    }

    const auction: Auction = {
      name: auctionName,
      expiryDate: expiryDate,
      isExpired: false,
      seller: seller,
      reservePrice: reservePrice,
    };

    const result = await this.auctionDbService.createAuction(auction);

    return {
      success: true,
      reason: `Auction ${name} created`,
      data: result
    };
  }

  async makeBid(auctionId: number, bid: number, bidderId: number): Promise<ActionResponse> {
    const auction = await this.auctionDbService.getAuction(auctionId);
    if (!auction) {
      return {
        success: false,
        reason: 'No such auction name'
      };
    }

    if ( auction.seller.id === bidderId ) {
      return {
        success: false,
        reason: 'Seller cannot bid on own auction'
      }
    }

    const bidder = await this.userService.findById(bidderId);

    if (!bidder) {
      return {
        success: false,
        reason: `Bidder ${bidderId} is not known`
      };
    }

    if (isBefore(auction.expiryDate, new Date())) {
      return {
        success: false,
        reason: `Auction ${auctionId} has expired`
      };
    }

    if (auction.winningBid && auction.winningBid.bidder.id === bidderId) {
      return {
        success: false,
        reason: `${bidder.email} already has the winning bid`
      };
    }

    if (auction.winningBid && auction.winningBid.bid >= bid) {
      return {
        success: false,
        reason: 'Bid less than or equal to current bid'
      };
    }

    const newBid = await this.auctionDbService.saveBid({
      auctionId: auctionId,
      bid: bid,
      bidder,
      time: new Date()
    })

    return {
      success: true,
      reason: 'Bid successful',
      data: newBid
    }
  }

  async getAuction(auctionId: number): Promise<Auction> {
    const auction = await this.auctionDbService.getAuction(auctionId);
    if (!auction) {
      throw new BadRequestException('No such auction');
    }

    return auction;
  }


}
