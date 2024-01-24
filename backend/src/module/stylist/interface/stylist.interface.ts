import { Types } from 'mongoose';
import { ServiceType } from "../enum/service-type.enum";

interface StylistServiceType {
  name: ServiceType;
  price: number;
}

interface Stylist {
  _id?: Types.ObjectId;
  // shopId: Types.ObjectId;
  firstName: string;
  lastName: string;
  serviceTypes: StylistServiceType[];
  description?: string;
  email?: string;
  phone?: string;
}

export default Stylist;