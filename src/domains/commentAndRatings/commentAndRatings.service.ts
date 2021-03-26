import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
export type User = any;
import {
  CommentAndRatings,
  fieldNeedToUseRegex,
} from './model/commentAndRatings.interface';
import { InjectModel } from '@nestjs/mongoose';
import { getNextCursor } from '../../helpers/gets';
import { buildFindingQuery } from '../../helpers/build';

@Injectable()
export class CommentAndRatingsService {
  constructor(
    @InjectModel('CommentAndRatings')
    private readonly commentAndRatingModel: Model<CommentAndRatings>,
  ) {}

  async findOne({ data }: any): Promise<CommentAndRatings | string> {
    try {
      const commentAndRating = await this.commentAndRatingModel
        .findOne(data)
        .populate('storeOwnerID')
        .exec();

      if (!commentAndRating) {
        return 'CommentAndRating not found';
      }

      return commentAndRating;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findProduct(query): Promise<CommentAndRatings | string> {
    try {
      const commentAndRating = await this.commentAndRatingModel
        .findOne(query)
        .populate('storeOwnerID')
        .exec();

      if (!commentAndRating) {
        return 'CommentAndRatings not found';
      }

      return commentAndRating;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async createOne({ data }: any): Promise<CommentAndRatings | undefined> {
    try {
      const commentAndRating = await new this.commentAndRatingModel(data);

      await commentAndRating.save();

      return await commentAndRating;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateOne({ data, query }): Promise<CommentAndRatings | string> {
    try {
      const commentAndRating = await this.commentAndRatingModel
        .findOne(query)
        .populate('storeOwnerID')
        .exec();

      if (!commentAndRating) {
        return 'CommentAndRating Not Found';
      }

      Object.assign(commentAndRating, data);

      await commentAndRating.save();

      return commentAndRating;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteOne(query): Promise<boolean | string> {
    try {
      const commentAndRating = await this.commentAndRatingModel
        .findOne(query)
        .exec();

      if (!commentAndRating) {
        return 'CommentAndRating not found';
      }

      await this.commentAndRatingModel.deleteOne(query).exec();

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findMany({ query, productID }) {
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
          ...productID,
        },
        fieldNeedToUseRegex,
      });

      const limits = parseInt(limit);
      const skip = parseInt(offset);
      if (hasPage) {
        promises.push(
          this.commentAndRatingModel
            .find(findingQuery)
            .populate('storeOwnerID')
            .sort(sortingCondition)
            .limit(limits)
            .skip(skip)
            .exec(),
          this.commentAndRatingModel.countDocuments(findAllQuery).exec(),
        );
      }

      if (!hasPage) {
        promises.push(
          this.commentAndRatingModel
            .find(findingQuery)
            .populate('storeOwnerID')
            .exec(),
          this.commentAndRatingModel.countDocuments(findAllQuery).exec(),
        );
      }

      const [commentAndRatings, totalCount] = await Promise.all(promises);

      if (!commentAndRatings || !commentAndRatings.length) {
        return {
          cursor: 'END',
          totalCount,
          list: [],
        };
      }

      const nextCursor = getNextCursor({
        data: commentAndRatings,
        sortBy,
      });

      return {
        cursor: nextCursor,
        totalCount,
        list: commentAndRatings,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
