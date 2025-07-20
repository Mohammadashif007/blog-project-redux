import { NextFunction, Request, Response } from "express";
import { AppError } from "../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

import config from "../config";
import { verifiedToken } from "../utils/jwt";

export const checkAuth =
  (...authRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        throw new AppError(httpStatus.BAD_REQUEST, "Token does not exist");
      }
      const verifiedToke = verifiedToken(
        accessToken,
        config.jwt_access_secret as string,
      ) as JwtPayload;
      if (!verifiedToke) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid token");
      }
      if (!authRole.includes(verifiedToke.role)) {
        throw new AppError(httpStatus.BAD_REQUEST, "You are not authorized");
      }
      req.user = verifiedToke;
      next();
    } catch (error) {
      next(error);
    }
  };
