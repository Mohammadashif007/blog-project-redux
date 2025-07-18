import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import httpStatus from "http-status-codes";
import { AppError } from "../../errorHelpers/AppError";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new Error();
    throw new AppError(httpStatus.BAD_GATEWAY, "Nothing is impossible");
    const data = req.body;
    const result = await UserServices.createUserIntoDB(data);
    res.status(httpStatus.CREATED).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserControllers = {
  createUser,
};
