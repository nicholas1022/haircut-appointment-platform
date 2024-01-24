import { Request, Response, NextFunction } from 'express';
import {
  AuthenticationError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  ValidationError
} from "./custom-errors";
import { Error } from "mongoose";
import logger from "../logger";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err);

  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: 'Not Found', message: err.message });
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({ error: 'Validation Error', message: err.message });
  }

  if (err instanceof InternalServerError) {
    return res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }

  if (err instanceof AuthenticationError) {
    return res.status(401).json({ error: 'Authentication Error', message: err.message });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(403).json({ error: 'Unauthorized Error', message: err.message });
  }

  return res.status(500).json({ error: 'Generic Error', message: err.message });
};

export default errorHandler;
