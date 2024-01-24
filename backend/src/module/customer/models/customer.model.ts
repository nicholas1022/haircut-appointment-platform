import mongoose, { Schema } from 'mongoose';
import CustomerInterface from "../interfaces/customer.interface";

interface CustomerDocument extends Document, CustomerInterface {}

const customerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
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

export default mongoose.model<CustomerDocument>("customers", customerSchema);