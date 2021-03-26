import { Document, Types } from 'mongoose';

export interface Users extends Document {
  userName?: string;
  passWord?: string;
  storeOwnerID?: Types.ObjectId;
  employeeID?: Types.ObjectId;
  fullName?: string;
  profilePicture?: string;
  email?: string;
  gender?: string;
  phone?: number;
  facebookID?: string;
  googleID?: string;
  status?: string;
  role?: string;
  rolePending?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const fieldNeedToUseRegex = ['fullName'];
