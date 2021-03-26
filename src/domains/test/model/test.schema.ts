import * as mongoose from 'mongoose';
const {
  Types: { ObjectId },
} = mongoose.Schema;

export const TestSchema = new mongoose.Schema(
  {
    name: { type: String },
    age: { type: String },
    breed: { type: String },
  },
  {
    timestamps: true,
  },
);
