import { Document, Types } from 'mongoose';

export interface Test extends Document {
  name: string;
  age: string;
  breed: string;
}
