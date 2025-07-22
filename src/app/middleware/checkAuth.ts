import { NextFunction, Request, Response } from "express";
import { AppError } from "../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

import config from "../config";
import { verifiedToken } from "../utils/jwt";
import { User } from "../module/user/user.model";
import { IsActive } from "../module/user/user.interface";

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
      const isUserExist = await User.findOne({email:verifiedToke.email})

      // const isUserExist = await User.findOne({email: verifiedToken.email});
 
      if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User not found");
      }
      if (
        isUserExist.isActive === IsActive.BLOCK ||
        isUserExist.isActive === IsActive.INACTIVE
      ) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `User is ${isUserExist.isActive}`,
        );
      }
      if (isUserExist.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is delete");
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
