import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { Auction, CreateAuctionRequest, CreateAuctionSchema, MakeBidRequest, MakeBidSchema } from '@monorepo/data';
import { JoiValidationPipe } from './joi-validation.pipe';

@Controller('auction')
export class AuctionController {
  constructor(private auctionService: AuctionService) {
  }

  @Post('/create')
  @UsePipes(new JoiValidationPipe(CreateAuctionSchema))
  createAuction(@Body() body: CreateAuctionRequest) {
    return this.auctionService.createAuction(
      body.auctionName,
      body.sellerId,
      body.reservePrice,
      body.expiryInSeconds);
  }

  @Post('/bid')
  @UsePipes(new JoiValidationPipe(MakeBidSchema))
  async makeBid(@Body() body: MakeBidRequest) {
    return await this.auctionService.makeBid(body.auctionId, body.bid, body.bidderUserId);
  }

  @Get(':id')
  getAuction(@Param('id', ParseIntPipe) auctionId: number): Promise<Auction> {
    return this.auctionService.getAuction(auctionId);
  }
}
