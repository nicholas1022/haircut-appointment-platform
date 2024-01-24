import logger from "../../../logger";
import { NotFoundError, ValidationError } from "../../../middleware/custom-errors";
import mongoose, { Types } from "mongoose";
import StylistModel from "../models/stylist.model";
import Stylist from "../interface/stylist.interface";
import ShopService from "../../shop/service/shop.service";
import { Role } from "../../auth/enum/role.enum";
import AuthService from "../../auth/services/auth.service";

class StylistService {
  private readonly stylistModel;
  private readonly shopService;
  private readonly authService;

  constructor(
    shopService: ShopService,
    authService: AuthService,
  ) {
    this.stylistModel = StylistModel;
    this.shopService = shopService;
    this.authService = authService;
  }

  public getAllStylists = async (): Promise<Stylist[]> => {
    logger.info("Getting all stylists");
    return await this.stylistModel.find({});
  }

  public getStylistById = async (stylistId: string): Promise<Stylist | null> => {
    logger.info(`Getting stylist with id: ${stylistId}`);
    return await this.stylistModel.findById(stylistId);
  }

  public signUpStylist = async (body: any): Promise<Stylist | null> => {
    logger.info(`Adding new stylist: ${JSON.stringify(body)}`);

    // const shop = await this.shopService.getShopById(body.shopId);
    // if (!shop) {
    //   throw new NotFoundError(`Shop not found with id: ${body.shopId}`);
    // }

    const id = await this.authService.signUpFirebase(body.email, body.password, Role.STYLIST);
    body = {...body, _id: id};

    const newStylist = new this.stylistModel(body);
    await newStylist.save();

    return newStylist;
  }

  public deleteStylist = async (stylistId: string) => {
    if (!stylistId) {
      throw new NotFoundError(`Stylist not found with id: ${stylistId}`);
    }

    logger.info(`Deleting stylist with id: ${stylistId}`);
    await this.stylistModel.findByIdAndDelete(stylistId);

    return;
  }

  public updateStylist = async (stylistId: string, body: any) => {
    if (!stylistId) {
      throw new NotFoundError(`Stylist not found with id: ${stylistId}`);
    }

    // const shop = await this.shopService.getShopById(body.shopId);
    // if (!shop) {
    //   throw new NotFoundError(`Shop not found with id: ${body.shopId}`);
    // }

    logger.info(`Updating stylist with id: ${stylistId}`);

    await this.stylistModel.updateOne(
      { _id: new Types.ObjectId(stylistId) },
      { $set: body }
    );

    return await this.stylistModel.findById(stylistId);
  }

  public findManyByIds = async (stylistIds: Array<Types.ObjectId>): Promise<Stylist[]> => {
    if (!stylistIds || stylistIds.length <= 0) {
      throw new ValidationError(`Stylist ID is required`);
    }
    
    return await this.stylistModel.find({
      '_id': { $in:
        stylistIds
      }
    });
  }
}

export default StylistService;