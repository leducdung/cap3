import * as mongoose from 'mongoose';
import {
  UserStatus,
  UserRole,
  UserAccessStatus,
} from '../../../constains/common';

const {
  Types: { ObjectId },
} = mongoose.Schema;

export const EmployeesSchema = new mongoose.Schema(
  {
    fullName: { type: String, default: null },
    storeOwnerID: { type: ObjectId, ref: 'Store_Owners' },
    photos: { type: String, default: null },
    email: { type: String, default: null },
    description: { type: String, default: null },
    phoneNumbers: { type: Number, default: null },
    address: { type: String, default: null },
  },
  {
    timestamps: true,
  },
);
