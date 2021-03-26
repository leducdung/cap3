import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { AuthModule } from '../../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TestSchema } from './model/test.schema';
import { databaseModule } from '../../database/database.module';

export const TestModel = MongooseModule.forFeature([
  {
    name: 'test',
    schema: TestSchema,
  },
]);
@Module({
  imports: [AuthModule, UsersModule, databaseModule, TestModel],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
