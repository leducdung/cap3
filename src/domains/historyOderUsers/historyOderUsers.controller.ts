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
  CreateNoticationDto,
  DataUpdateNoticationDto,
  ParamNoticationDto,
  FindNoticationDto,
} from './model/historyOderUsers.dto';
import { ApiTags } from '@nestjs/swagger';
import { NoticationsService } from './historyOderUsers.service';
import * as bcrypt from 'bcrypt';
import { Notications } from './model/historyOderUsers.interface';

@ApiTags('notications')
@Controller('')
export class NoticationsController {
  constructor(private readonly noticationsService: NoticationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('notications')
  async findMany(
    @Query() query: FindNoticationDto,
    @Param() notificationID: ParamNoticationDto,
    @Request() { req },
  ) {
    try {
      const notication = await this.noticationsService.findMany({
        query,
      });

      return notication;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('notications/:notificationID')
  async findOne(
    @Param() { notificationID }: ParamNoticationDto,
    @Request() req,
  ) {
    try {
      return this.noticationsService.findProduct({ _id: notificationID });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('notications')
  async createOne(
    @Body() createNoticationDto: CreateNoticationDto,
    @Param() notificationID: ParamNoticationDto,
    @Request() req,
  ) {
    try {
      return this.noticationsService.createOne({
        data: {
          createdBy: req.user.resultUser._id,
          notificationID: notificationID.notificationID,
          ...createNoticationDto,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('notications/:notificationID')
  async Delete(@Param() notificationID: ParamNoticationDto, @Request() req) {
    try {
      return this.noticationsService.deleteOne({
        _id: notificationID.notificationID,
      });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('notications/:notificationID')
  async updateOne(
    @Param() notificationID: ParamNoticationDto,
    @Body() data: DataUpdateNoticationDto,
    @Request() req,
  ) {
    try {
      return this.noticationsService.updateOne({
        data,
        query: { _id: notificationID.notificationID },
      });
    } catch (error) {
      throw error;
    }
  }
}
