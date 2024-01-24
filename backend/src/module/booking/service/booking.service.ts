import logger from "../../../logger";
import Booking from "../interfaces/booking.interface";
import { NotFoundError, UnauthorizedError } from "../../../middleware/custom-errors";
import { Date, Types } from "mongoose";
import BookingModel from "../models/booking.model";
import CustomerService from "../../customer/services/customer.service";
import StylistService from "../../stylist/service/stylist.service";
import ReviewService from "../../review/service/review.service";

class BookingService {
  private readonly bookingModel;
  private readonly customerService;
  private readonly stylistService;
  private readonly reviewService;

  constructor(
    customerService: CustomerService,
    stylistService: StylistService,
    reviewService: ReviewService,
  ) {
    this.bookingModel = BookingModel;
    this.customerService = customerService;
    this.stylistService = stylistService;
    this.reviewService = reviewService;
  }

  public getBookingsByCustomer = async (customerId: string): Promise<Booking[]> => {
    logger.info(`Getting bookings by customer with id: ${customerId}`);
    const bookings = await this.bookingModel.find({
      customerId: new Types.ObjectId(customerId)
    }) as Booking[];
    const stylistIds = bookings.map(booking => new Types.ObjectId(booking.stylistId));
    const stylists = await this.stylistService.findManyByIds(stylistIds as Types.ObjectId[]);
    
    const reviewIds = bookings.filter(booking => booking.reviewId).map(booking => new Types.ObjectId(booking.reviewId));
    const reviews = await this.reviewService.findManyByIds(reviewIds as Types.ObjectId[]);
    
    const stylistMap = new Map();
    stylists.forEach((stylist) => stylistMap.set(stylist._id?.toString(), stylist));
    
    const reviewMap = new Map();
    reviews.forEach((review) => reviewMap.set(review._id?.toString(), review));
    
    const updated =  bookings.map(booking => {
      let up = booking;
      if (booking.stylistId) {
        up = {
          ...up,
          stylist: stylistMap.get(booking.stylistId.toString())
        }
      }
      if (booking.reviewId) {
        up = {
          ...up,
          review: reviewMap.get(booking.reviewId.toString())
        }
      }
      return up;
    });
    return updated;
  }

  public getBookingsByStylist = async (stylistId: string): Promise<Booking[]> => {
    logger.info(`Getting bookings by stylist with id: ${stylistId}`);
    return await this.bookingModel.find({
      stylistId: new Types.ObjectId(stylistId)
    });
  }

  public createBooking = async (body: any) => {
    logger.info(`Adding new booking: ${JSON.stringify(body)}`);

    if (!(await this.customerService.getCustomer(body.customerId))) {
      throw new NotFoundError(`Customer not found with id: ${body.customerId}`);
    }
    if (!(await this.stylistService.getStylistById(body.stylistId))) {
      throw new NotFoundError(`Stylist not found with id: ${body.stylistId}`);
    }

    const newBooking = new this.bookingModel(body);
    await newBooking.save();

    return newBooking;
}

  public cancelBooking = async (bookingId: string, customerId?: string, stylistId?: string) => {
    const booking = await this.bookingModel.findById(bookingId);

    if (!booking) {
      throw new NotFoundError(`Booking not found with id: ${bookingId}`);
    }
    if (customerId && booking.customerId.toString() !== customerId) {
      throw new UnauthorizedError("You are not authorized to cancel this booking");
    }
    if (stylistId && booking.stylistId && booking.stylistId.toString() !== stylistId) {
      throw new UnauthorizedError("You are not authorized to cancel this booking");
    }

    logger.info(`Cancelling booking with id: ${bookingId}`);

    await this.bookingModel.updateOne(
      { _id: new Types.ObjectId(bookingId) },
      { $set: { isCancelled: true } }
    )

    return await this.bookingModel.findById(bookingId);
  }

  public updateBooking = async (bookingId: string, body: any, customerId?: string, stylistId?: string) => {
    const booking = await this.bookingModel.findById(bookingId);

    if (!booking) {
      throw new NotFoundError(`Booking not found with id: ${bookingId}`);
    }
    if (customerId && booking.customerId.toString() !== customerId) {
      throw new UnauthorizedError("You are not authorized to update this booking");
    }
    if (stylistId && booking.stylistId && booking.stylistId.toString() !== stylistId) {
      throw new UnauthorizedError("You are not authorized to update this booking");
    }

    if (body.customerId && !(await this.customerService.getCustomer(body.customerId))) {
      throw new NotFoundError(`Customer in body not found with id: ${body.customerId}`);
    }
    if (body.stylistId && !(await this.stylistService.getStylistById(body.stylistId))) {
      throw new NotFoundError(`Stylist in body not found with id: ${body.stylistId}`);
    }

    logger.info(`Updating booking with id: ${bookingId}`);

    await this.bookingModel.updateOne(
      { _id: new Types.ObjectId(bookingId) },
      { $set: body }
    );

    return await this.bookingModel.findById(bookingId);
  }

  public getBookingsByStylistTime = async (id: string, startTime: string, endTime: string): Promise<Booking[]> => {
    logger.info(`Getting bookings by stylist with id: ${id} from ${startTime} to ${endTime} (exclusive)`);
    const start = new Date(startTime);
    const end = new Date(endTime);
    if (end <= start) {
      throw new Error("End time must be greater than start time.");
    }
    let bookings = await this.bookingModel.find({
      stylistId: new Types.ObjectId(id),
      startAt:{
        $gte: new Date(startTime),
        $lt: new Date(endTime)
      }
    });
    return bookings.sort((a: Booking, b: Booking) => a.startAt.getDate() - b.startAt.getDate());
  } 
}

export default BookingService;