import { Injectable } from '@nestjs/common';
import { EmployeesService } from '../employees/employees.service';
import { StoreOwnersService } from '../storeOwners/storeOwners.service';
import { UsersService } from '../users/users.service';
import { Users } from '../users/model/users.interface';

@Injectable()
export class GGCombinedService {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly storeOwnersService: StoreOwnersService,
    private readonly usersService: UsersService,
  ) {}

  async createOneUserAndAcess({ data }): Promise<Users | undefined> {
    try {
      const storeOwner = await this.storeOwnersService.createOne({
        data,
      });

      const employee = await this.employeesService.createOne({
        data,
      });

      const user = await this.usersService.createOne({
        data: {
          ...data,
          storeOwnerID: storeOwner._id,
          employeeID: employee._id,
        },
      });

      return await user;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
