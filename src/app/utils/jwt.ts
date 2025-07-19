import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

export const generateToken = (payload: JwtPayload) => {
  const accessToken = jwt.sign(payload, config.jwt_secret as string, {
    expiresIn: "1d",
  });
  return accessToken;
};

export const verifyToken = (accessToken: string) => {
  const verifiedToken = jwt.verify(accessToken, config.jwt_secret as string);
  return verifiedToken;
};
