import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
export type User = any;
import { Products, fieldNeedToUseRegex } from './model/products.interface';
import { InjectModel } from '@nestjs/mongoose';
import { getNextCursor } from '../../helpers/gets';
import { buildFindingQuery } from '../../helpers/build';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Products')
    private readonly productModel: Model<Products>,
  ) {}

  async findOne({ data }: any): Promise<Products | string> {
    try {
      const product = await this.productModel
        .findOne(data)
        .populate('storeOwnerID')
        .exec();

      if (!product) {
        return 'Product not found';
      }

      return product;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findProduct(query): Promise<Products | string> {
    try {
      const product = await this.productModel
        .findOne(query)
        .populate('storeOwnerID')
        .exec();

      if (!product) {
        return 'Products not found';
      }

      return product;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async createOne({ data }: any): Promise<Products | undefined> {
    try {
      const product = await new this.productModel(data);

      await product.save();

      return await product;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateOne({ data, query }): Promise<Products | string> {
    try {
      const product = await this.productModel
        .findOne(query)
        .populate('storeOwnerID')
        .exec();

      if (!product) {
        return 'Product Not Found';
      }

      Object.assign(product, data);

      await product.save();

      return product;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteOne(query): Promise<boolean | string> {
    try {
      const product = await this.productModel.findOne(query).exec();

      if (!product) {
        return 'Product not found';
      }

      await this.productModel.deleteOne(query).exec();

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
          this.productModel
            .find(findingQuery)
            .populate('storeOwnerID')
            .sort(sortingCondition)
            .limit(limits)
            .skip(skip)
            .exec(),
          this.productModel.countDocuments(findAllQuery).exec(),
        );
      }

      if (!hasPage) {
        promises.push(
          this.productModel.find(findingQuery).populate('storeOwnerID').exec(),
          this.productModel.countDocuments(findAllQuery).exec(),
        );
      }

      const [products, totalCount] = await Promise.all(promises);

      if (!products || !products.length) {
        return {
          cursor: 'END',
          totalCount,
          list: [],
        };
      }

      const nextCursor = getNextCursor({
        data: products,
        sortBy,
      });

      return {
        cursor: nextCursor,
        totalCount,
        list: products,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
