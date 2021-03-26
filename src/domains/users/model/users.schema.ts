import * as mongoose from 'mongoose';
import { UserStatus, UserRole } from '../../../constains/common';

const {
  Types: { ObjectId },
} = mongoose.Schema;

export const UsersSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      index: true,
      unique: true,
      sparse: true,
      require: true,
    },
    passWord: { type: String, require: true },
    storeOwnerID: { type: ObjectId, ref: 'Store_Owners', default: null },
    employeeID: { type: ObjectId, ref: 'Employees', default: null },
    profilePicture: { type: String, default: null },
    gender: { type: String, default: null },
    fullName: { type: String, default: null },
    email: { type: String, default: null },
    phone: { type: Number, default: null },
    facebookID: { type: String, default: null },
    googleID: { type: String, default: null },
    status: { type: String, enum: UserStatus, default: UserStatus.UNLOCK },
    rolePending: { type: String, enum: UserRole, default: UserRole.BASIC },
    role: { type: String, enum: UserRole, default: UserRole.BASIC },
  },
  {
    timestamps: true,
  },
);
