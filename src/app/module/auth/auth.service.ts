import { AppError } from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcrypt from "bcrypt";
import { IUser } from "../user/user.interface";

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
  const user = { name: isUserExist.name, email: isUserExist.email };
  return user;
};

export const AuthServices = {
  loginUser,
};
