import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { AuctionService } from './auction.service';
import {
  ActionResponse,
  Auction,
  CreateAuctionRequest,
  CreateAuctionSchema,
  MakeBidRequest,
  MakeBidSchema
} from '@monorepo/data';
import { JoiValidationPipe } from './joi-validation.pipe';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('auction')
export class AuctionController {
  constructor(private auctionService: AuctionService) {
  }

  @Get()
  getAllAuctions() {
    return this.auctionService.getAllAuctions()
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(CreateAuctionSchema))
  createAuction(@Body() body: CreateAuctionRequest, @Req() req) {
    return this.auctionService.createAuction(
      body.auctionName,
      req.user.id,
      body.reservePrice,
      body.expiryInSeconds);
  }

  @Post('/bid')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(MakeBidSchema))
  async makeBid(@Body() body: MakeBidRequest, @Req() req) {
    return await this.auctionService.makeBid(body.auctionId, body.bid, req.user.id);
  }

  @Get(':id')
  getAuction(@Param('id', ParseIntPipe) auctionId: number): Promise<Auction> {
    return this.auctionService.getAuction(auctionId);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', ParseIntPipe) auctionId: number): Promise<ActionResponse> {
    return await this.auctionService.deleteAuction(auctionId);
  }
}
