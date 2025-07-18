/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError } from "../../errorHelpers/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcrypt from "bcrypt";
import config from "../../config";

const createUserIntoDB = async (payload: IUser) => {
  const { email, password, ...rest } = payload;
  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exist");
  }

  const hashedPassword = await bcrypt.hash(
    password as string,
    Number(config.bcrypt_salt_round),
  );

  const user = await User.create({ email, password: hashedPassword, ...rest });

  const { password: pass, ...userData } = user.toObject();
  
  return userData;
};

const getAllUsersFromDB = async () => {
  const users = await User.find({});
  const totalUsers = await User.countDocuments();
  return { data: users, meta: { total: totalUsers } };
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
};
