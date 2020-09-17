import { Injectable } from '@nestjs/common';
import { Auction, Bid } from '@monorepo/data';
import { MariaDbService } from '../db/maria-db.service';
import { formatDistanceStrict, formatDistanceToNow, formatDistanceToNowStrict, formatRelative } from 'date-fns';

@Injectable()
export class AuctionDbService {

  constructor(private dbService: MariaDbService) {
  }

  async deleteAuction(id: number): Promise<void> {
    const conn = await this.dbService.getConnection();
    const results = await conn.query(
      `DELETE FROM auctions
      WHERE id = ${id}`);
  }

  async getAllAuctions(): Promise<Auction[]> {
    const conn = await this.dbService.getConnection();
    const results = await conn.query(
      `SELECT auctions.*,
                   seller.email as sellerEmail,
                   bids.bid as winningBid,
                   bids.bidderUserId as winningBidderId,
                   bidder.email as winningBidderEmail
      FROM auctions
      JOIN users AS seller ON auctions.sellerUserId = seller.id
      LEFT OUTER JOIN bids ON auctions.winningBidId = bids.id
      LEFT OUTER JOIN users as bidder ON bids.bidderUserId = bidder.id
      ORDER BY expiryDate DESC`);
    const auctions = results.splice(0, results.length);

    return auctions.map(auction => {
      let ret = {
        ...auction,
        seller: {
          id: auction.sellerUserId,
          email: auction.sellerEmail
        },
        winningBid : {
          id: auction.winningBidId,
          bid: auction.winningBid,
          bidder: {
            id: auction.winningBidderId,
            email: auction.winningBidderEmail
          }
        }
      };

      delete ret.sellerUserId;
      delete ret.email;
      delete ret.winningBidId;
      delete ret.winningBidderId;
      delete ret.winningBidderEmail;
      return ret;
    });

  }

  async getExpiredAuctions(): Promise<Auction[]> {
    const conn = await this.dbService.getConnection();
    if ( !conn ) {
      return [];
    }

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
    if ( auctions.length !== 1 ) {
      return null;
    }
    const auction: any = auctions[0];

    const result = await conn.query((
      `SELECT bids.*, users.email as userEmail
       FROM bids, users
       WHERE auctionId=${id}
       AND users.id = bids.bidderUserId
       ORDER BY bids.time DESC`
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

    const sellerQueryResult = await conn.query(
      `SELECT id, email
            FROM users
            WHERE id = ${auction.sellerUserId}`);

    auction.seller = sellerQueryResult[0];

    delete auction.sellerUserId;
    delete auction.winningBidId;

    return auction;
  }

  async createAuction(auction: Auction): Promise<Auction> {
    const conn = await this.dbService.getConnection();
    const result = await conn.query(
      `INSERT INTO auctions (itemName, expiryDate, sellerUserId, reservePrice )
               VALUES (?, ?, ?, ?)`,
      [auction.itemName, auction.expiryDate, auction.seller.id, auction.reservePrice]
    );
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
