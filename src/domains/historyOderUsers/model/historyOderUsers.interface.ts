import { Document, Types } from 'mongoose';

export interface Notications extends Document {
  productID?: Types.ObjectId;
  commentAndRatingID?: Types.ObjectId;
  body?: string;
  title?: string;
  clickAction?: string;
  isRead?: boolean;
  event?: string;
  receiverUID?: Types.ObjectId[];
  createdBy?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export const fieldNeedToUseRegex = ['title'];
