import { auth } from "../config/firebase.config";
import { Request, Response, NextFunction } from 'express';
import { AuthenticationError } from "./custom-errors";
import logger from "../logger";

export interface AuthRequest extends Request {
  authData?: {
    uid: string;
    role: string;
  };
}

export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  logger.info("Verifying token");

  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decodeValue = await auth.verifyIdToken(token);

      if (decodeValue?.uid && decodeValue?.role) {
        req.authData = {
          uid: decodeValue.uid,
          role: decodeValue.role,
        };
        return next();
      } else {
        throw new AuthenticationError('Invalid Token');
      }
    } catch (err) {
      next(err);
    }
  } else {
    next(new AuthenticationError('No Token was found.'))
  }
};

