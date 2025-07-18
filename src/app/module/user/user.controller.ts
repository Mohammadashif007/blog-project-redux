import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../routes/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await UserServices.createUserIntoDB(data);
  sendResponse({
    res,
    success: true,
    statusCode: 201,
    message: "User created successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await UserServices.getAllUsersFromDB();
  sendResponse({
    res,
    success: true,
    statusCode: 200,
    message: "All user retrieve successfully",
    data: users,
  });
});

export const UserControllers = {
  createUser,
  getAllUsers,
};
