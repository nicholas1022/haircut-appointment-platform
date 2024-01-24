import express from 'express';
import StylistController from "../controllers/stylist.controller";

const initializeStylistRouter = (stylistController: StylistController): express.Router => {
  const stylistRouter = express.Router();

  stylistRouter.get('/', stylistController.getAllStylists);
  stylistRouter.post('/signup', stylistController.signUpStylist);
  stylistRouter.delete('/:id', stylistController.deleteStylist);
  stylistRouter.put('/:id', stylistController.updateStylist);
  stylistRouter.get('/:id', stylistController.getStylist);
  return stylistRouter;
}

export default initializeStylistRouter;
