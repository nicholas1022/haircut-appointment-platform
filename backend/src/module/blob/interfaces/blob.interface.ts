import { Types } from 'mongoose';

interface Blob {
  _id?: Types.ObjectId;
  type: string;
  fileName: string;
  userId: Types.ObjectId;
}

export default Blob;
