import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
export type User = any;
import { Employees, fieldNeedToUseRegex } from './model/employees.interface';
import { InjectModel } from '@nestjs/mongoose';
import { getNextCursor } from '../../helpers/gets';
import { buildFindingQuery } from '../../helpers/build';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel('Employees')
    private readonly employeesModel: Model<Employees>,
  ) {}

  async findOne({ data }: any): Promise<Employees | string> {
    try {
      const employees = await this.employeesModel
        .findOne(data)
        .populate('storeOwnerID')
        .exec();

      if (!employees) {
        return 'Employees not found';
      }

      return employees;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOneStoreOwner(query): Promise<Employees | string> {
    try {
      const employees = await this.employeesModel
        .findOne(query)
        .populate('storeOwnerID')
        .exec();

      if (!employees) {
        return 'Employees not found';
      }

      return employees;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async createOne({ data }: any): Promise<Employees | undefined> {
    try {
      const employees = await new this.employeesModel(data);

      await employees.save();

      return await employees;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateOne({ data, _id }): Promise<Employees | string> {
    try {
      const employees = await this.employeesModel.findOne(_id).exec();

      if (!employees) {
        return 'Employees Not Found';
      }

      Object.assign(employees, data);

      await employees.save();

      return employees;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteOne(query): Promise<boolean | string> {
    try {
      const employees = await this.employeesModel.findOne(query).exec();

      if (!employees) {
        return 'Employees not found';
      }

      await this.employeesModel.deleteOne(query).exec();

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
          this.employeesModel
            .find(findingQuery)
            .populate('storeOwnerID')
            .sort(sortingCondition)
            .limit(limits)
            .skip(skip)
            .exec(),
          this.employeesModel.countDocuments(findAllQuery).exec(),
        );
      }

      if (!hasPage) {
        promises.push(
          this.employeesModel
            .find(findingQuery)
            .populate('storeOwnerID')
            .exec(),
          this.employeesModel.countDocuments(findAllQuery).exec(),
        );
      }

      const [employees, totalCount] = await Promise.all(promises);

      if (!employees || !employees.length) {
        return {
          cursor: 'END',
          totalCount,
          list: [],
        };
      }

      const nextCursor = getNextCursor({
        data: employees,
        sortBy,
      });

      return {
        cursor: nextCursor,
        totalCount,
        list: employees,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
