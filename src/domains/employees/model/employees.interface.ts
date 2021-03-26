import { Document } from 'mongoose';

export interface Employees extends Document {
  fullName?: string;
  photos?: string;
  email?: string;
  description?: string;
  phoneNumber?: number;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const fieldNeedToUseRegex = ['name'];
