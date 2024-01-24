import express from "express";
import BlobController from "../controllers/blob.controller";

const initializeBlobRouter = (blobController: BlobController): express.Router => {
  const blobRouter = express.Router();

  blobRouter.get("/", blobController.getBlobsRefPaths);
  blobRouter.post("/", blobController.createBlob);

  return blobRouter;
}

export default initializeBlobRouter;