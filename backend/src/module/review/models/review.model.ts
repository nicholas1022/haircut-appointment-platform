import mongoose, { Schema, Types } from 'mongoose';
import ReviewInterface from "../interfaces/review.interface";

interface ReviewDocument extends Document, ReviewInterface {}

const ReviewSchema = new Schema(
  {
    customerId: {
      type: Types.ObjectId,
      required: true,
    },

    stylistId: {
      type: Types.ObjectId,
      required: true,
    },

    serviceType: {
      type: String,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },
  },
  {
      timestamps: true,
  });

export default mongoose.model<ReviewDocument>('reviews', ReviewSchema);