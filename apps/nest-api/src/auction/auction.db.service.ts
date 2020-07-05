import { Injectable } from '@nestjs/common';
import { Auction, Bid } from '@monorepo/data';
import { MariaDbService } from '../db/maria-db.service';

@Injectable()
export class AuctionDbService {

  constructor(private dbService: MariaDbService) {
  }

  async getExpiredAuctions(): Promise<Auction[]> {
    const conn = await this.dbService.getConnection();
    const results = await conn.query(
      `SELECT *
      FROM auctions
      WHERE expiryDate < now()
      AND isExpired = 0`);
    return results.splice(0, results.length);
  }

  async expireAuction(auctionId: number) {
    let conn = await this.dbService.getConnection();
    await conn.query(
      `UPDATE auctions
      SET isExpired = 1
      WHERE id = ${auctionId}`);
  }

  async getAuction(id: number): Promise<Auction> {
    const conn = await this.dbService.getConnection();
    const auctions = await conn.query(
      `SELECT * FROM auctions WHERE id=${id}`);
    const auction: any = auctions[0];

    const result = await conn.query((
      `SELECT bids.*, users.email as userEmail
       FROM bids, users
       WHERE auctionId=${id}
       AND users.id = bids.bidderUserId`
    ));

    const bids = result.splice(0, result.length);

    bids.forEach(bid => {
      const typedBid: Bid = {
        id: bid.id,
        auctionId: bid.auctionId,
        bid: bid.bid,
        time: bid.time,
        bidder: {
          id: bid.bidderUserId,
          email: bid.userEmail
        }
      };

      if (!auction.bidHistory) {
        auction.bidHistory = [];
      }
      if (bid.id === auction.winningBidId) {
        auction.winningBid = typedBid;
      }
      auction.bidHistory.push(typedBid);
    });

    auction.seller = await conn.query(
      `SELECT id, email
            FROM users
            WHERE id = ${auction.sellerUserId}`);

    delete auction.sellerUserId;
    delete auction.winningBidId;

    return auction;
  }

  async createAuction(auction: Auction): Promise<Auction> {
    const conn = await this.dbService.getConnection();
    const result = await conn.query(
      `INSERT INTO auctions (name, expiryDate, sellerUserId, reservePrice )
               VALUES (?, ?, ?, ?)`,
      [auction.name, auction.expiryDate, auction.seller.id, auction.reservePrice]
    );
    console.log('create auction', JSON.stringify(result, null, 2));
    return {
      ...auction,
      id: result.insertId
    };
  }

  async saveBid(bid: Bid) {
    const conn = await this.dbService.getConnection();
    const result = await conn.query(
      `INSERT INTO bids (auctionId, bid, time, bidderUserId )
            VALUES (?, ?, ?, ?)`,
      [bid.auctionId, bid.bid, bid.time, bid.bidder.id]
    );

    await conn.query(
      `UPDATE auctions
           SET winningBidId = ${result.insertId}
           WHERE id = ${bid.auctionId}
      `);

    return {
      id: result.insertId,
      ...bid
    };
  }

}
