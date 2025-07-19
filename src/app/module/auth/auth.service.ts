/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError } from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcrypt from "bcrypt";
import { IsActive, IUser } from "../user/user.interface";
import { generateToken, verifiedToken } from "../../utils/jwt";
import config from "../../config";
import { createUserTokens } from "../../utils/userTokens";
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

  const userTokens = createUserTokens(payload);

  const { password: pass, ...rest } = isUserExist.toObject();

  return {
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
    user: rest,
  };
};

const getNewAccessToken = async (refreshToken: string) => {
  const verifiedRefreshToken = verifiedToken(
    refreshToken,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const isUserExist = await User.findOne({ email: verifiedRefreshToken.email });
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found");
  }
  if (
    isUserExist.isActive === IsActive.BLOCK ||
    isUserExist.isActive === IsActive.INACTIVE
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `User is ${isUserExist.isActive}`,
    );
  }
  if (isUserExist.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is delete");
  }

  const payload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = generateToken(
    payload,
    config.jwt_access_secret as string,
    config.jwt_access_expired as string,
  );

  return {
    accessToken,
  };
};
export const AuthServices = {
  loginUser,
  getNewAccessToken,
};
