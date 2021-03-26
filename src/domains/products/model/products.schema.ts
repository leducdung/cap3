import * as mongoose from 'mongoose';
import {
  UserStatus,
  statusProduct,
  productsTag,
} from '../../../constains/common';

const {
  Types: { ObjectId },
} = mongoose.Schema;

export const ProductsSchema = new mongoose.Schema(
  {
    name: { type: String, default: null },
    description: { type: String, default: null },
    photos: { type: String, default: null },
    price: { type: Number, default: null },
    status: {
      type: String,
      enum: statusProduct,
      default: statusProduct.STOCKING,
    },
    tradeMark: { type: String, default: null },
    origin: { type: String, default: null },
    nextWeight: { type: Number, default: null },
    tag: { type: String, enum: productsTag, default: productsTag.FOOD },
    inCard: { type: Boolean, default: null },
    percentDiscount: { type: Number, default: null },
    quantitySold: { type: Number, default: null },
    calories: { type: String, default: null },
    statusAccount: {
      type: String,
      enum: UserStatus,
      default: UserStatus.UNLOCK,
    },
    createdBy: { type: ObjectId, ref: 'Users' },
    storeOwnerID: { type: ObjectId, ref: 'Store_Owners' },
  },
  {
    timestamps: true,
  },
);
