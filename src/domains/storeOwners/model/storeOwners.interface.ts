import { Document } from 'mongoose';

export interface StoreOwners extends Document {
  name?: string;
  photos?: string;
  email?: string;
  description?: string;
  phoneNumber?: number;
  address?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const fieldNeedToUseRegex = ['name'];
