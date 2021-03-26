import { Document, Types } from 'mongoose';

export interface Products extends Document {
  name?: string;
  description?: string;
  photos?: string;
  price?: string;
  origin?: number;
  nextWeight?: number;
  tag?: string;
  inCard?: string;
  percentDiscount?: string;
  quantitySold?: string;
  calories?: string;
  createdBy?: Types.ObjectId;
  storeOwnerID?: Types.ObjectId;
  statusAccount?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const fieldNeedToUseRegex = ['name'];
