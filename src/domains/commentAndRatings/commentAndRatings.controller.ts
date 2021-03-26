import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  Put,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';
import { AuthService } from '../../auth/auth.service';
import {
  CreateCommentAndRatingDto,
  DataUpdateCommentAndRatingDto,
  ParamCommentAndRatingDto,
  FindCommentAndRatingDto,
} from './model/commentAndRatings.dto';
import { ApiTags } from '@nestjs/swagger';
import { CommentAndRatingsService } from './commentAndRatings.service';
import * as bcrypt from 'bcrypt';
import { CommentAndRatings } from './model/\bcommentAndRatings.interface';

@ApiTags('commentAndRatings')
@Controller('')
export class CommentAndRatingsController {
  constructor(
    private readonly commentAndRatingsService: CommentAndRatingsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('products/:productID/commentAndRatings')
  async findMany(
    @Query() query: FindCommentAndRatingDto,
    @Param() productID: ParamCommentAndRatingDto,
    @Request() { req },
  ) {
    try {
      const commentAndRating = await this.commentAndRatingsService.findMany({
        query,
        productID,
      });

      return commentAndRating;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('products/:productID/commentAndRatings/:commentAndRatingID')
  async findOne(
    @Param() { commentAndRatingID, productID }: ParamCommentAndRatingDto,
    @Request() req,
  ) {
    try {
      return this.commentAndRatingsService.findProduct({
        _id: commentAndRatingID,
      });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('products/:productID/commentAndRatings')
  async createOne(
    @Body() createCommentAndRatingDto: CreateCommentAndRatingDto,
    @Param() productID: ParamCommentAndRatingDto,
    @Request() req,
  ) {
    try {
      return this.commentAndRatingsService.createOne({
        data: {
          ...createCommentAndRatingDto,
          createdBy: req.user.resultUser._id,
          productID: productID.productID,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('products/:productID/commentAndRatings/:commentAndRatingID')
  async Delete(
    @Param() commentAndRatingID: ParamCommentAndRatingDto,
    @Request() req,
  ) {
    try {
      return this.commentAndRatingsService.deleteOne({
        _id: commentAndRatingID.commentAndRatingID,
      });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('products/:productID/commentAndRatings/:commentAndRatingID')
  async updateOne(
    @Param() commentAndRatingID: ParamCommentAndRatingDto,
    @Body() data: DataUpdateCommentAndRatingDto,
    @Request() req,
  ) {
    try {
      return this.commentAndRatingsService.updateOne({
        data,
        query: { _id: commentAndRatingID.commentAndRatingID },
      });
    } catch (error) {
      throw error;
    }
  }
}
