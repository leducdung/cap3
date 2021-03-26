import * as mongoose from 'mongoose';
import {
  UserStatus,
  UserRole,
  UserAccessStatus,
} from '../../../constains/common';

const {
  Types: { ObjectId },
} = mongoose.Schema;

export const StoreOwnersSchema = new mongoose.Schema(
  {
    name: { type: String, default: null },
    photos: { type: String, default: null },
    email: { type: String, default: null },
    description: { type: String, default: null },
    phoneNumbers: { type: Number, default: null },
    address: { type: String, default: null },
    status: {
      type: String,
      enum: UserAccessStatus,
      default: UserAccessStatus.NOSTATUS,
    },
  },
  {
    timestamps: true,
  },
);
