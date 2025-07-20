/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError } from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcrypt from "bcrypt";
import { IsActive, IUser } from "../user/user.interface";
import { generateToken, verifiedToken } from "../../utils/jwt";
import config from "../../config";
import {
  createNewAccessTokenWithRefreshToken,
  createUserTokens,
} from "../../utils/userTokens";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const loginUser = async (payload: Partial<IUser>) => {
  const { email } = payload;
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email dose not match");
  }
  const isPasswordMatch = await bcrypt.compare(
    payload.password as string,
    isUserExist.password as string,
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect password");
  }

  const jwtPayload = {
    role: isUserExist.role,
    email: isUserExist.email,
    userId: isUserExist._id,
  };

  const userTokens = createUserTokens(jwtPayload);

  const { password: pass, ...rest } = isUserExist.toObject();

  return {
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
    user: rest,
  };
};

const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken =
    await createNewAccessTokenWithRefreshToken(refreshToken);

  return {
    accessToken: newAccessToken,
  };
};

export const AuthServices = {
  loginUser,
  getNewAccessToken,
};
