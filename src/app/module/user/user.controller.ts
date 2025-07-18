import { Request, Response } from "express";
import { UserServices } from "./user.service";
import httpStatus from "http-status-codes";

const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await UserServices.createUserIntoDB(data);
    res.status(httpStatus.CREATED).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const UserControllers = {
  createUser,
};
