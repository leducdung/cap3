import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';
// import { LocalAuthGuard } from '../../auth/local/local-auth.guard';
// import { AuthService } from '../../auth/auth.service';
import { CreateUserDto } from './model/test.dto';
import { ApiTags } from '@nestjs/swagger';
import { TestService } from './test.service';

@ApiTags('test')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @UseGuards()
  @Post('create')
  async createOne(@Body() createUserDto: CreateUserDto, @Request() { user }) {
    try {
      return await this.testService.createOne({
        data: createUserDto,
      });
    } catch (error) {
      return error;
    }
  }
}
