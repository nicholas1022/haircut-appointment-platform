import ReviewModel from "../models/review.model";
import logger from "../../../logger";
import Review from "../interfaces/review.interface";
import { NotFoundError, ValidationError } from "../../../middleware/custom-errors";
import { Types } from "mongoose";
import CustomerService from "../../customer/services/customer.service";
import StylistService from "../../stylist/service/stylist.service";
import Stylist from "../../stylist/interface/stylist.interface";

class ReviewService {
  private readonly reviewModel;
  private readonly customerService;
  private readonly stylistService;

  constructor(
    customerService: CustomerService,
    stylistService: StylistService
    
  ) {
    this.reviewModel = ReviewModel;
    this.customerService = customerService;
    this.stylistService = stylistService;
  }

  public getAllReviews = async (): Promise<Review[]> => {
    logger.info("Getting all reviews");
    return await this.reviewModel.find({});
  }

  public createReview = async (body: any) => {
    logger.info(`Adding new review: ${JSON.stringify(body)}`);

    const customer = await this.customerService.getCustomer(body.customerId);
    if (!customer) {
      throw new NotFoundError(`Customer not found with id: ${body.customerId}`);
    }

    const stylist = await this.stylistService.getStylistById(body.stylistId);
    if (!stylist) {
      throw new NotFoundError(`Stylist not found with id: ${body.stylistId}`);
    }

    const newReview = new this.reviewModel(body);
    await newReview.save();

    return newReview;
}

  public deleteReview = async (reviewId: string) => {
    if (!reviewId) {
      throw new NotFoundError(`Review not found with id: ${reviewId}`);
    }

    logger.info(`Deleting review with id: ${reviewId}`);
    await this.reviewModel.findByIdAndDelete(reviewId);

    return;
  }

  public updateReview = async (reviewId: string, body: any) => {
    if (!reviewId) {
      throw new NotFoundError(`Stylist not found with id: ${reviewId}`);
    }

    const customer = await this.customerService.getCustomer(body.customerId);
    if (!customer) {
      throw new NotFoundError(`Customer not found with id: ${body.customerId}`);
    }

    const stylist = await this.stylistService.getStylistById(body.stylistId);
    if (!stylist) {
      throw new NotFoundError(`Stylist not found with id: ${body.stylistId}`);
    }

    logger.info(`Updating review with id: ${reviewId}`);

    await this.reviewModel.updateOne(
      { _id: new Types.ObjectId(reviewId) },
      { $set: body }
    );

    return await this.reviewModel.findById(reviewId);
  }

  public getReviewById = async (reviewId: string): Promise<Review | null> => {
    return await this.reviewModel.findById(reviewId);
  }

  public getReviewsByStylistId = async (id: string): Promise<Review[]> => {
    const stylist = await this.stylistService.getStylistById(id);
    if (!stylist) {
      throw new NotFoundError(`Stylist not found with id: ${id}`);
    }
    return await this.reviewModel.find({stylistId: id}).exec();
  }

  public getReviewsByCustomerId = async (id: string): Promise<Review[]> => {
    return await this.reviewModel.find({customertId: id});
  }

  public findManyByIds = async (reviewIds: Array<Types.ObjectId>): Promise<Review[]> => {
    if (!reviewIds || reviewIds.length <= 0) {
      throw new ValidationError(`Review ID is required`);
    }
    
    return await this.reviewModel.find({
      '_id': { $in:
        reviewIds
      }
    });
  }
}

export default ReviewService;