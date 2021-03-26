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
  CreateProductDto,
  FindManyProductDto,
  DataUpdateProductDto,
  ParamProductDto,
} from './model/products.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import * as bcrypt from 'bcrypt';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async findMany(@Query() query: FindManyProductDto, @Request() { req }) {
    try {
      const product = await this.productsService.findMany({
        query,
      });

      return product;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':productID')
  async findOne(@Param() productID, @Request() req) {
    try {
      return this.productsService.findProduct({ _id: productID.productID });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createOne(@Body() createProductDto: CreateProductDto, @Request() req) {
    try {
      return this.productsService.createOne({
        data: {
          ...createProductDto,
          createdBy: req.user.resultUser._id,
          storeOwnerID: req.user.resultUser.storeOwnerID._id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':productID')
  async Delete(@Param() productID, @Request() req) {
    try {
      return this.productsService.deleteOne({ _id: productID.productID });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':productID')
  async updateOne(
    @Param() productID,
    @Body() data: DataUpdateProductDto,
    @Request() req,
  ) {
    try {
      return this.productsService.updateOne({
        data,
        query: { _id: productID.productID },
      });
    } catch (error) {
      throw error;
    }
  }
}
