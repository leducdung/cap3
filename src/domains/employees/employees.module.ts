import { Module, forwardRef } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesSchema } from './model/employees.schema';
import { AuthModule } from '../../auth/auth.module';
import { databaseModule } from '../../database/database.module';
import { EmployeesController } from './employees.controller';

export const EmployeeModel = MongooseModule.forFeature([
  {
    name: 'Employees',
    schema: EmployeesSchema,
  },
]);

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => databaseModule),
    forwardRef(() => EmployeeModel),
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
