import { Request, Response } from "express";
import { UserServices } from "./user.service";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await UserServices.createUserIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const {userId} = req.params;
  const payload = req.body;
  const verifiedToken = req.user;
  const result = await UserServices.updateUserIntoDB(
    userId,
    payload,
    verifiedToken as JwtPayload,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await UserServices.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.ACCEPTED,
    success: true,
    message: "All user retrieve Successfully",
    data: users,
    meta: users.meta,
  });
});

export const UserControllers = {
  createUser,
  getAllUsers,
  updateUser,
};
