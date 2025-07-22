import {  Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { setAuthCookie } from "../../utils/setCookie";
import { JwtPayload } from "jsonwebtoken";
import { createUserTokens } from "../../utils/userTokens";
import { AppError } from "../../errorHelpers/AppError";
import config from "../../config";


const loginUser = catchAsync(async (req: Request, res: Response) => {
  const loginInfo = await AuthServices.loginUser(req.body);
  console.log(loginInfo);
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

const logOut = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    message: "User logout successfully",
    data: null,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const oldPassword = req.body.oldPassword;
  const resetPassword = req.body.password;
  const decodedToken = req.user as JwtPayload;
  await AuthServices.resetPassword(oldPassword, resetPassword, decodedToken);
  sendResponse(res, {
    success: true,
    message: "Password changed successfully",
    statusCode: httpStatus.ACCEPTED,
    data: null,
  });
});

// const googleCallBackController = catchAsync(async(req: Request, res: Response) => {
//   const user = req.user;
//   console.log("user", user);
//   if(!user){
//     throw new AppError(httpStatus.BAD_REQUEST, "Google user not found")
//   }
//   const tokenInfo =  createUserTokens(user);
//   setAuthCookie(res, tokenInfo);
//   res.redirect(config.frontend_url as string)
// })

const googleCallBackController = catchAsync(
  async (req: Request, res: Response) => {
    let redirectTo = req.query.state? req.query.state as string :  "" ;
    if(redirectTo.startsWith("/")){
      redirectTo = redirectTo.slice(1)
    }
    const user = req.user;
    console.log("user", user);
    if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, "User not found");
    }
    const tokenInfo = createUserTokens(user);
    setAuthCookie(res, tokenInfo);
    res.redirect(`${config.frontend_url}/${redirectTo}`);
  },
);

export const AuthControllers = {
  loginUser,
  createNewAccessToken,
  logOut,
  resetPassword,
  googleCallBackController,
};
