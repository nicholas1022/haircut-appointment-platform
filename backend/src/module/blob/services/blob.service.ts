import BlobModel from "../models/blob.model";
import BlobInterface from "../interfaces/blob.interface";
import { Types } from "mongoose";

class BlobService {
  private readonly blobModel;

  constructor(
  ) {
    this.blobModel = BlobModel;
  }

  public getBlobsRefPaths = async (userIds: string[], type: string): Promise<any[]> => {
    if (!userIds || userIds.length === 0) throw new Error("Missing userIds");
    if (!type) throw new Error("Missing type");

    const blobs = await this.blobModel.aggregate([
      {
        $match: { userId: { $in: userIds.map(id => new Types.ObjectId(id)) }, type: type }
      },
      {
        $sort: { userId: 1, createdAt: -1 }
      },
      {
        $group: {
          _id: "$userId",
          latestBlob: { $first: "$$ROOT" }
        }
      },
      {
        $replaceRoot: { newRoot: "$latestBlob" }
      }
    ]);

    return blobs.map(blob => {
      return {
        userId: blob.userId,
        path: `${blob.type}/${blob.fileName}`
      }
    });
  }


  public createBlob = async (body: any): Promise<BlobInterface> => {
    const blob = new this.blobModel(body);
    await blob.save();
    return blob;
  }
}

export default BlobService;