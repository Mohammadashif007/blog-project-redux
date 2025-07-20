import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { setAuthCookie } from "../../utils/setCookie";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const loginInfo = await AuthServices.loginUser(req.body);
  setAuthCookie(res, loginInfo);
  setAuthCookie(res, loginInfo);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    message: "User login successfully",
    data: loginInfo,
  });
});

const createNewAccessToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  const tokenInfo = await AuthServices.getNewAccessToken(
    refreshToken as string,
  );

  setAuthCookie(res, tokenInfo);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    message: "User login successfully",
    data: tokenInfo,
  });
});

export const AuthControllers = {
  loginUser,
  createNewAccessToken,
};
