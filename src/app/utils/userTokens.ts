import config from "../config";
import { IUser } from "../module/user/user.interface";
import { generateToken } from "./jwt";

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
