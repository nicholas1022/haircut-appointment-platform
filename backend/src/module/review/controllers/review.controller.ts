import { NextFunction, Request, Response } from 'express';
import ReviewService from "../service/review.service";

class ReviewController {
  private readonly reviewService;

  constructor(reviewService: ReviewService) {
    this.reviewService = reviewService;
  }

  public getAllReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reviews = await this.reviewService.getAllReviews();
      res.send(reviews);
    } catch (err) {
      next(err);
    }
  }

  public createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const review = await this.reviewService.createReview(req.body);
      res.send(review);
    } catch (err) {
      next(err);
    }
  }

  public deleteReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.reviewService.deleteReview(req?.params?.id);
      res.send("Deleted successfully");
    } catch (err) {
      next(err);
    }
  }

  public updateReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedReview = await this.reviewService.updateReview(req?.params?.id, req.body);
      res.send(updatedReview);
    } catch (err) {
      next(err);
    }
  }

  public getReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const review = await this.reviewService.getReviewById(req.params?.id);
      res.status(200).send(review);
    } catch (err) {
      next(err);
    }
  }

  public getReviewsByStylist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reviews = await this.reviewService.getReviewsByStylistId(req.params?.id);
      res.status(200).send(reviews);
    } catch (err) {
      next(err);
    }
  }

  public getReviewsByCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reviews = await this.reviewService.getReviewsByCustomerId(req.params?.id);
      res.status(200).send(reviews);
    } catch (err) {
      next(err);
    }
  }
}

export default ReviewController;