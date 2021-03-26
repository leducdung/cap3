import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
export type User = any;
import { Users, fieldNeedToUseRegex } from './model/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { getNextCursor } from '../../helpers/gets';
import { buildFindingQuery } from '../../helpers/build';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users')
    private readonly usersModel: Model<Users>,
  ) {}

  async findOne({ data }: any): Promise<Users> {
    try {
      const a = await this.usersModel
        .findOne(data)
        .populate('storeOwnerID')
        .populate('employeeID')
        .exec();
      return a;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOneUser(query): Promise<Users> {
    try {
      const user = await this.usersModel
        .findOne(query)
        .populate('storeOwnerID')
        .populate('employeeID')
        .exec();
      return user;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async createOne({ data }): Promise<Users | undefined> {
    try {
      const user = await new this.usersModel(data);

      await user.save();

      return await user;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateOne({ data, query }): Promise<Users | string> {
    try {
      const user = await this.usersModel
        .findOne(query)
        .populate('storeOwnerID')
        .populate('employeeID')
        .exec();

      if (!user) {
        return 'User Not Found';
      }

      Object.assign(user, data);

      await user.save();

      return user;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteOne({ query }): Promise<boolean | string> {
    try {
      const user = await this.usersModel.findOne(query).exec();

      if (!user) {
        return 'User not found';
      }

      await this.usersModel.deleteOne(query).exec();

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findMany({ query }) {
    try {
      const {
        limit = 10,
        sortBy = 'query',
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
          this.usersModel
            .find(findingQuery)
            .populate('storeOwnerID')
            .populate('employeeID')
            .sort(sortingCondition)
            .limit(limits)
            .skip(skip)
            .exec(),
          this.usersModel.countDocuments(findAllQuery).exec(),
        );
      }

      if (!hasPage) {
        promises.push(
          this.usersModel
            .find(findingQuery)
            .populate('storeOwnerID')
            .populate('employeeID')
            .exec(),
          this.usersModel.countDocuments(findAllQuery).exec(),
        );
      }

      const [documents, totalCount] = await Promise.all(promises);

      if (!documents || !documents.length) {
        return {
          cursor: 'END',
          totalCount,
          list: [],
        };
      }

      const nextCursor = getNextCursor({
        data: documents,
        sortBy,
      });

      return {
        cursor: nextCursor,
        totalCount,
        list: documents,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
