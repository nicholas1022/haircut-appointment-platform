import { Types } from 'mongoose';

interface Customer {
  _id?: Types.ObjectId;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
}

export default Customer;
