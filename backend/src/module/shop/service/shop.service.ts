import ShopModel from "../models/shop.model";
import logger from "../../../logger";
import Shop from "../interfaces/shop.interface";
import { NotFoundError } from "../../../middleware/custom-errors";
import { Types } from "mongoose";

class ShopService {
  private readonly shopModel;

  constructor() {
    this.shopModel = ShopModel;
  }

  public getAllShops = async (): Promise<Shop[]> => {
    logger.info("Getting all shops");
    return await this.shopModel.find({});
  }

  public createShop = async (body: any) => {
    logger.info(`Adding new shop: ${JSON.stringify(body)}`);

    const newShop = new this.shopModel(body);
    await newShop.save();

    return newShop;
}

  public deleteShop = async (shopId: string) => {
    if (!shopId) {
      throw new NotFoundError(`Shop not found with id: ${shopId}`);
    }

    logger.info(`Deleting shop with id: ${shopId}`);
    await this.shopModel.findByIdAndDelete(shopId);

    return;
  }

  public updateShop = async (shopId: string, body: any) => {
    if (!shopId) {
      throw new NotFoundError(`Stylist not found with id: ${shopId}`);
    }

    logger.info(`Updating shop with id: ${shopId}`);

    await this.shopModel.updateOne(
      { _id: new Types.ObjectId(shopId) },
      { $set: body }
    );

    return await this.shopModel.findById(shopId);
  }

  public getShopById = async (shopId: string): Promise<Shop | null> => {
    return await this.shopModel.findById(shopId);
  }
}

export default ShopService;