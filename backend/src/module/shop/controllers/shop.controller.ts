import { NextFunction, Request, Response } from 'express';
import ShopService from "../service/shop.service";

class ShopController {
  private readonly shopService;

  constructor(shopService: ShopService) {
    this.shopService = shopService;
  }

  public getAllShops = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shops = await this.shopService.getAllShops();
      res.send(shops);
    } catch (err) {
      next(err);
    }
  }

  public createShop = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shop = await this.shopService.createShop(req.body);
      res.send(shop);
    } catch (err) {
      next(err);
    }
  }

  public deleteShop = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.shopService.deleteShop(req?.params?.id);
      res.send("Deleted successfully");
    } catch (err) {
      next(err);
    }
  }

  public updateShop = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedShop = await this.shopService.updateShop(req?.params?.id, req.body);
      res.send(updatedShop);
    } catch (err) {
      next(err);
    }
  }
}

export default ShopController;