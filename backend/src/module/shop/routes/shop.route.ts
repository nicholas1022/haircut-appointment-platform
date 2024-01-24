import express from 'express';
import ShopController from "../controllers/shop.controller";

const initializeShopRouter = (shopController: ShopController): express.Router => {
  const shopRouter = express.Router();

  shopRouter.get('/', shopController.getAllShops);
  shopRouter.post('/', shopController.createShop);
  shopRouter.delete('/:id', shopController.deleteShop);
  shopRouter.put('/:id', shopController.updateShop);
  return shopRouter;
}

export default initializeShopRouter;
