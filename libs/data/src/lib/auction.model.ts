import { User } from './user.model';
import * as Joi from '@hapi/joi';

export const CreateAuctionSchema = Joi.object({
  auctionName: Joi.string().required().max(50).min(5),
  reservePrice: Joi.number().required(),
  expiryInSeconds: Joi.number().required()
});

export interface CreateAuctionRequest {
  auctionName: string,
  reservePrice: number,
  expiryInSeconds: number
}

export const MakeBidSchema = Joi.object({
  bid: Joi.number().required(),
  auctionId: Joi.number().required()
});

export interface MakeBidRequest {
  bid: number;
  auctionId: number;
}

export interface Bid {
  id?: number;
  auctionId: number;
  bid: number;
  time: Date;
  bidder: User;
}

export interface Auction {
  id?: number;
  itemName: string;
  seller: User;
  isExpired: boolean;
  expiryDate: Date;
  reservePrice: number;
  bidHistory?: Bid[];
  winningBid?: Bid;
}

export interface ActionResponse {
  success: boolean;
  reason?: string;
  data?: any;
}
