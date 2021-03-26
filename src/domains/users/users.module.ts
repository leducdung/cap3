import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './model/users.schema';
import { AuthModule } from '../../auth/auth.module';
import { databaseModule } from '../../database/database.module';
import { UsersController } from './users.controller';
import { StoreOwnersModule } from '../storeOwners/storeOwners.module';
import { UsersCombinedService } from './users.combined.service';
import { EmployeesModule } from '../employees/employees.module';

export const UsersModel = MongooseModule.forFeature([
  {
    name: 'Users',
    schema: UsersSchema,
  },
]);

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    forwardRef(() => StoreOwnersModule),
    forwardRef(() => EmployeesModule),
    forwardRef(() => databaseModule),
    forwardRef(() => UsersModel),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersCombinedService],
  exports: [UsersService, UsersCombinedService],
})
export class UsersModule {}
