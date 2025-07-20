import { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { AppError } from "../errorHelpers/AppError";
import { IsActive, IUser } from "../module/user/user.interface";
import { User } from "../module/user/user.model";
import { generateToken, verifiedToken } from "./jwt";
import httpStatus from "http-status-codes";

export const createUserTokens = (user: Partial<IUser>) => {
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expired as string,
  );

  const refreshToken = generateToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expired as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const createNewAccessTokenWithRefreshToken = async (
  refreshToken: string,
) => {
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

  return accessToken;
};
