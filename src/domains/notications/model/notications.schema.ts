import * as mongoose from 'mongoose';
import {
  UserStatus,
  UserRole,
  EventNotification,
} from '../../../constains/common';

const {
  Types: { ObjectId },
} = mongoose.Schema;

export const NoticationsSchema = new mongoose.Schema(
  {
    productID: { type: ObjectId, ref: 'Products' },
    commentAndRatingID: { type: ObjectId, ref: 'CommentAndRatings' },
    body: { type: String, default: null },
    title: { type: String, default: null },
    clickAction: { type: String, default: null },
    isRead: { type: Boolean, default: false },
    event: {
      type: String,
      enum: EventNotification,
      default: EventNotification.ORDERED,
    },
    receiverUID: [{ type: ObjectId, ref: 'Users' }],
    createdBy: { type: ObjectId, ref: 'Users' },
  },
  {
    timestamps: true,
  },
);
