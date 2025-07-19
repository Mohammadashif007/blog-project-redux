import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";


export const generateToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: string,
) => {
  const accessToken = jwt.sign(payload, secret, { expiresIn } as SignOptions);
  return accessToken;
};

export const verifiedToken = (accessToken: string, secret: string) => {
  const verifyToken = jwt.verify(accessToken, secret);
  return verifyToken;
};
