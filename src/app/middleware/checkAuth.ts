import { NextFunction, Request, Response } from "express";
import { AppError } from "../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth =
  (...authRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        throw new AppError(httpStatus.BAD_REQUEST, "Token does not exist");
      }
      const verifiedToke = verifyToken(accessToken) as JwtPayload;
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
