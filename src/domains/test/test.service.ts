import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Test } from './model/test.interface';
import { Model } from 'mongoose';

@Injectable()
export class TestService {
  constructor(
    @InjectModel('test')
    private readonly testModel: Model<Test>,
  ) {}

  async createOne({ data }): Promise<any> {
    try {
      const user = await new this.testModel(data);

      await user.save();

      return await user;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
