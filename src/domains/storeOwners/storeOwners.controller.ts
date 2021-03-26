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
  CreatestoreOwnerDto,
  FindManyStoreOwnersDto,
  DataUpdateStoreOwnerDto,
  ParamUserDto,
} from './model/storeOwners.dto';
import { ApiTags } from '@nestjs/swagger';
import { StoreOwnersService } from './storeOwners.service';
import * as bcrypt from 'bcrypt';

@ApiTags('storeOwners')
@Controller('storeOwners')
export class StoreOwnersController {
  constructor(private readonly storeOwnersService: StoreOwnersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async findMany(@Query() query: FindManyStoreOwnersDto, @Request() { req }) {
    try {
      const storeOwners = await this.storeOwnersService.findMany({
        query,
      });

      return storeOwners;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':storeOwnerID')
  async findOne(@Param() storeOwnerID, @Request() req) {
    try {
      return this.storeOwnersService.findOneStoreOwner({
        _id: storeOwnerID.storeOwnerID,
      });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createOne(
    @Body() createstoreOwnerDto: CreatestoreOwnerDto,
    @Request() req,
  ) {
    try {
      return this.storeOwnersService.createOne({ data: createstoreOwnerDto });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':storeOwnerID')
  async Delete(@Param() storeOwnerID, @Request() req) {
    try {
      return this.storeOwnersService.deleteOne({ _id: storeOwnerID });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':storeOwnerID')
  async updateOne(
    @Param() storeOwnerID,
    @Body() data: DataUpdateStoreOwnerDto,
    @Request() req,
  ) {
    try {
      return this.storeOwnersService.updateOne({
        data,
        query: {
          _id: storeOwnerID.storeOwnerID,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post(':storeOwnerID/createEmployee')
  async createOneEmployee(@Param() storeOwnerID, @Request() req) {
    try {
      return this.storeOwnersService.createAccountEmployee({
        storeOwnerID,
      });
    } catch (error) {
      throw error;
    }
  }
}
