import { NextFunction, Request, Response } from 'express';
import BlobService from "../services/blob.service";

class BlobController {
  private readonly blobService;

  constructor(blobService: BlobService) {
    this.blobService = blobService;
  }

  public getBlobsRefPaths = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paths = await this.blobService.getBlobsRefPaths(req.query.ids as string[], req.query.type as string);
      res.status(200).send(paths);
    } catch (err) {
      next(err);
    }
  }

  public createBlob = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blob = await this.blobService.createBlob(req.body);
      res.status(200).send(blob);
    } catch (err) {
      next(err);
    }
  }
}

export default BlobController;