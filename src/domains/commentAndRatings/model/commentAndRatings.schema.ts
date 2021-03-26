import * as mongoose from 'mongoose';
import {
  UserStatus,
  UserRole,
  UserAccessStatus,
} from '../../../constains/common';

const {
  Types: { ObjectId },
} = mongoose.Schema;

export const CommentAndRatingsSchema = new mongoose.Schema(
  {
    title: { type: String, default: null },
    description: { type: String, default: null },
    isFaborit: { type: Boolean, default: false },
    rateStar: { type: Number, default: 0 },
    comment: { type: String, default: null },
    createdBy: { type: ObjectId, ref: 'Users' },
    productID: { type: ObjectId, ref: 'Products' },
  },
  {
    timestamps: true,
  },
);
