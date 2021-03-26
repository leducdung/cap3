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
import { CreateEmployeeDto } from './model/employees.dto';
import { ApiTags } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import * as bcrypt from 'bcrypt';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async findMany(@Query() query, @Request() { req }) {
    try {
      const employee = await this.employeesService.findMany({
        query,
      });

      return employee;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':_id')
  async findOne(@Param() _id, @Request() req) {
    try {
      return this.employeesService.findOneStoreOwner(_id);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createOne(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @Request() req,
  ) {
    try {
      return this.employeesService.createOne({ data: createEmployeeDto });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':_id')
  async Delete(@Param() _id, @Request() req) {
    try {
      return this.employeesService.deleteOne(_id);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':_id')
  async updateOne(@Param() _id, @Body() data, @Request() req) {
    try {
      return this.employeesService.updateOne({ data, _id });
    } catch (error) {
      throw error;
    }
  }
}
