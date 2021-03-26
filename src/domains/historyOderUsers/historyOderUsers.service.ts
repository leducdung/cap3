import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
export type User = any;
import {
  Notications,
  fieldNeedToUseRegex,
} from './model/historyOderUsers.interface';
import { InjectModel } from '@nestjs/mongoose';
import { getNextCursor } from '../../helpers/gets';
import { buildFindingQuery } from '../../helpers/build';

@Injectable()
export class NoticationsService {
  constructor(
    @InjectModel('Notications')
    private readonly noticationsModel: Model<Notications>,
  ) {}

  async findOne({ data }: any): Promise<Notications | string> {
    try {
      const notication = await this.noticationsModel
        .findOne(data)
        .populate('productID')
        .populate('commentAndRatingID')
        .populate('receiverUID')
        .populate('createdBy')
        .exec();

      if (!notication) {
        return 'Notication not found';
      }

      return notication;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findProduct(query): Promise<Notications | string> {
    try {
      const notication = await this.noticationsModel
        .findOne(query)
        .populate('productID')
        .populate('commentAndRatingID')
        .populate('receiverUID')
        .populate('createdBy')
        .exec();

      if (!notication) {
        return 'Notications not found';
      }

      return notication;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async createOne({ data }: any): Promise<Notications | undefined> {
    try {
      const notication = await new this.noticationsModel(data);

      await notication.save();

      return await notication;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateOne({ data, query }): Promise<Notications | string> {
    try {
      const notication = await this.noticationsModel
        .findOne(query)
        .populate('productID')
        .populate('commentAndRatingID')
        .populate('receiverUID')
        .populate('createdBy')
        .exec();

      if (!notication) {
        return 'Notication Not Found';
      }

      Object.assign(notication, data);

      await notication.save();

      return notication;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteOne(query): Promise<boolean | string> {
    try {
      const notication = await this.noticationsModel.findOne(query).exec();

      if (!notication) {
        return 'Notication not found';
      }

      await this.noticationsModel.deleteOne(query).exec();

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
          this.noticationsModel
            .find(findingQuery)
            .populate('productID')
            .populate('commentAndRatingID')
            .populate('receiverUID')
            .populate('createdBy')
            .sort(sortingCondition)
            .limit(limits)
            .skip(skip)
            .exec(),
          this.noticationsModel.countDocuments(findAllQuery).exec(),
        );
      }

      if (!hasPage) {
        promises.push(
          this.noticationsModel
            .find(findingQuery)
            .populate('productID')
            .populate('commentAndRatingID')
            .populate('receiverUID')
            .populate('createdBy')
            .exec(),
          this.noticationsModel.countDocuments(findAllQuery).exec(),
        );
      }

      const [notications, totalCount] = await Promise.all(promises);

      if (!notications || !notications.length) {
        return {
          cursor: 'END',
          totalCount,
          list: [],
        };
      }

      const nextCursor = getNextCursor({
        data: notications,
        sortBy,
      });

      return {
        cursor: nextCursor,
        totalCount,
        list: notications,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
