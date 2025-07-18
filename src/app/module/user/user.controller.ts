import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import httpStatus from "http-status-codes";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const result = await UserServices.createUserIntoDB(data);
    res.status(httpStatus.CREATED).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: `Something went wrong`,
    //   error,
    // });
    next(error);
  }
};

export const UserControllers = {
  createUser,
};
