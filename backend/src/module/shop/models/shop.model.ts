import mongoose, { Schema } from 'mongoose';
import ShopInterface from "../interfaces/shop.interface";

interface ShopDocument extends Document, ShopInterface {}

const ShopSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
  },
  {
      timestamps: true,
  });

export default mongoose.model<ShopDocument>('shops', ShopSchema);