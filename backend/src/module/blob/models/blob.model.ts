import mongoose, { Schema, Types } from 'mongoose';
import BlobInterface from "../interfaces/blob.interface";

interface BlobDocument extends Document, BlobInterface {}

const blobSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<BlobDocument>("blobs", blobSchema);