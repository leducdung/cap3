import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
export type User = any;
import {
  StoreOwners,
  fieldNeedToUseRegex,
} from './model/storeOwners.interface';
import { InjectModel } from '@nestjs/mongoose';
import { getNextCursor } from '../../helpers/gets';
import { buildFindingQuery } from '../../helpers/build';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { EmployeesService } from '../employees/employees.service';

@Injectable()
export class StoreOwnersService {
  constructor(
    @InjectModel('Store_Owners')
    private readonly storeOwnersModel: Model<StoreOwners>,
    private readonly usersService: UsersService,
    private readonly employeesService: EmployeesService,
  ) {}

  async findOne({ data }: any): Promise<StoreOwners | string> {
    try {
      const storeOwner = await this.storeOwnersModel.findOne(data).exec();

      if (!storeOwner) {
        return 'StoreOwner not found';
      }

      return storeOwner;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOneStoreOwner(query): Promise<StoreOwners | string> {
    try {
      const storeOwner = await this.storeOwnersModel.findOne(query).exec();

      if (!storeOwner) {
        return 'StoreOwner not found';
      }

      return storeOwner;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async createOne({ data }: any): Promise<StoreOwners | undefined> {
    try {
      const storeOwner = await new this.storeOwnersModel(data);

      await storeOwner.save();

      return await storeOwner;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateOne({ data, query }): Promise<StoreOwners | string> {
    try {
      const storeOwner = await this.storeOwnersModel.findOne(query).exec();

      if (!storeOwner) {
        return 'storeOwner Not Found';
      }

      Object.assign(storeOwner, data);

      await storeOwner.save();

      return storeOwner;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteOne(query): Promise<boolean | string> {
    try {
      const storeOwner = await this.storeOwnersModel.findOne(query).exec();

      if (!storeOwner) {
        return 'StoreOwner not found';
      }

      await this.storeOwnersModel.deleteOne(query).exec();

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findMany({ query }) {
    try {
      const {
        limit = 10,
        sortBy = '_id',
        offset = 0,
        ...queryWithoutSortByAndLimit
      } = query;

      const promises = [];

      const {
        sortingCondition,
        findingQuery,
        findAllQuery,
        hasPage,
      } = buildFindingQuery({
        query: {
          ...queryWithoutSortByAndLimit,
          sortBy,
          limit,
        },
        fieldNeedToUseRegex,
      });

      const limits = parseInt(limit);
      const skip = parseInt(offset);
      if (hasPage) {
        promises.push(
          this.storeOwnersModel
            .find(findingQuery)
            .populate('createdBy')
            .sort(sortingCondition)
            .limit(limits)
            .skip(skip)
            .exec(),
          this.storeOwnersModel.countDocuments(findAllQuery).exec(),
        );
      }

      if (!hasPage) {
        promises.push(
          this.storeOwnersModel.find(findingQuery).populate('createdBy').exec(),
          this.storeOwnersModel.countDocuments(findAllQuery).exec(),
        );
      }

      const [storeOwner, totalCount] = await Promise.all(promises);

      if (!storeOwner || !storeOwner.length) {
        return {
          cursor: 'END',
          totalCount,
          list: [],
        };
      }

      const nextCursor = getNextCursor({
        data: storeOwner,
        sortBy,
      });

      return {
        cursor: nextCursor,
        totalCount,
        list: storeOwner,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  makeid(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async createAccountEmployee(storeOwnerID) {
    try {
      const saltOrRounds = await 10;

      const hash = await bcrypt.hash('djtmemay', saltOrRounds);

      const employee = await this.employeesService.createOne({
        data: {
          fullName: this.makeid(5),
        },
      });

      const user = await this.usersService.createOne({
        data: {
          employeeID: employee._id,
          storeOwnerID: storeOwnerID._id,
          userName: this.makeid(5),
          passWord: hash,
          role: 'EMPLOYEE',
          rolePending: 'EMPLOYEE',
        },
      });

      return await user;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
