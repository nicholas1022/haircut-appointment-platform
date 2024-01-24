import express from 'express';
import ReviewController from "../controllers/review.controller";

const initializeReviewRouter = (reviewController: ReviewController): express.Router => {
  const reviewRouter = express.Router();

  reviewRouter.get('/', reviewController.getAllReviews);
  reviewRouter.get('/:id', reviewController.getReview);
  reviewRouter.post('/', reviewController.createReview);
  reviewRouter.delete('/:id', reviewController.deleteReview);
  reviewRouter.put('/:id', reviewController.updateReview);
  reviewRouter.get('/stylist/:id', reviewController.getReviewsByStylist);

  return reviewRouter;
}

export default initializeReviewRouter;
