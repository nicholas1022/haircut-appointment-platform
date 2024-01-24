import mongoose, { Schema, Types } from 'mongoose';
import ShopInterface from "../interfaces/booking.interface";
import { ServiceType } from "../../stylist/enum/service-type.enum";
import stylistModel from '../../stylist/models/stylist.model';
import reviewModel from '../../review/models/review.model';

interface BookingDocument extends Document, ShopInterface {}

const BooingSchema = new Schema(
  {
    customerId: {
      type: Types.ObjectId,
      required: true
    },
    
    stylistId: {
      type: Types.ObjectId,
      // required: true
    },

    // stylist: {
    //   type: stylistModel
    // },

    reviewId: {
      type: Types.ObjectId,
      required: false
    },

    // review: {
    //   types: reviewModel
    // },

    startAt: {
      type: Date,
      required: true
    },

    endAt: {
      type: Date,
      required: true
    },

    serviceType: {
      type: String,
      enum: Object.values(ServiceType),
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    isCancelled: {
      type: Boolean,
      default: false
    },
  },
  {
      timestamps: true,
  });

export default mongoose.model<BookingDocument>('bookings', BooingSchema);