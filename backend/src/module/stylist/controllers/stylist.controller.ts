import { NextFunction, Request, Response } from 'express';
import StylistService from "../service/stylist.service";

class StylistController {
  private readonly stylistService;

  constructor(stylistService: StylistService) {
    this.stylistService = stylistService;
  }

  public getAllStylists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stylists = await this.stylistService.getAllStylists();
      res.status(200).send(stylists);
    } catch (err) {
      next(err);
    }
  }

  public signUpStylist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newStylist = await this.stylistService.signUpStylist(req.body);
      res.status(201).send(newStylist);
    } catch (err) {
      next(err);
    }
  }

  public deleteStylist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.stylistService.deleteStylist(req?.params?.id);
      res.status(200).send("Deleted successfully");
    } catch (err) {
      next(err);
    }
  }

  public updateStylist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedShop = await this.stylistService.updateStylist(req?.params?.id, req.body);
      res.status(200).send(updatedShop);
    } catch (err) {
      next(err);
    }
  }

  public getStylist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stylist = await this.stylistService.getStylistById(req?.params?.id);
      res.status(200).send(stylist);
    } catch (err) {
      next(err);
    }
  }  
}

export default StylistController;