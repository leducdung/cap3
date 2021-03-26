import { Module, forwardRef } from '@nestjs/common';
import { StoreOwnersService } from './storeOwners.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreOwnersSchema } from './model/storeOwners.schema';
import { AuthModule } from '../../auth/auth.module';
import { databaseModule } from '../../database/database.module';
import { StoreOwnersController } from './storeOwners.controller';
import { EmployeesModule } from '../employees/employees.module';
import { UsersModule } from '../users/users.module';

export const StoreOwnerModel = MongooseModule.forFeature([
  {
    name: 'Store_Owners',
    schema: StoreOwnersSchema,
  },
]);

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => databaseModule),
    forwardRef(() => StoreOwnerModel),
    forwardRef(() => EmployeesModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [StoreOwnersController],
  providers: [StoreOwnersService],
  exports: [StoreOwnersService],
})
export class StoreOwnersModule {}
