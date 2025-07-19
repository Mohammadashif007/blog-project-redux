import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const user = await AuthServices.loginUser(body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    message: "User login successfully",
    data: user,
  });
});

const createNewAccessToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.headers.authorization;
  const user = await AuthServices.getNewAccessToken(refreshToken as string);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    message: "User login successfully",
    data: user,
  });
});

export const AuthControllers = {
  loginUser,
  createNewAccessToken
};
