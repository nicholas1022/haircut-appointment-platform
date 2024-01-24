import mongoose, { Schema, Types } from 'mongoose';
import { ServiceType } from "../enum/service-type.enum";
import StylistInterface from "../interface/stylist.interface";

interface StylistDocument extends Document, StylistInterface {}

const stylistSchema = new Schema(
  {
    // shopId: {
    //   type: Types.ObjectId,
    //   required: true,
    // },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    serviceTypes: {
      type: [{
        name: {
          type: String,
          enum: Object.values(ServiceType),
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      }],
      _id: false,
    },

    description: {
      type: String,
    },

    email: {
      type: String,
    },

    phone: {
      type: String,
    }
  },
  {
    timestamps: true,
  });

export default mongoose.model<StylistDocument>('stylists', stylistSchema);