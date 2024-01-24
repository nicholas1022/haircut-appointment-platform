import { Types } from "mongoose";
import { ServiceType } from "../../stylist/enum/service-type.enum";
import Review from "../../review/interfaces/review.interface";
import Stylist from "../../stylist/interface/stylist.interface";

interface Booking  {
  _id?: Types.ObjectId;
  customerId: Types.ObjectId;
  stylistId?: Types.ObjectId;
  stylist?: Stylist;
  reviewId?: Types.ObjectId;
  review?: Review;
  startAt: Date;
  endAt: Date;
  serviceType: ServiceType;
  price: number;
  isCancelled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default Booking;
