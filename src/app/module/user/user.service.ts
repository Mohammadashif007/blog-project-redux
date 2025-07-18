import { AppError } from "../../errorHelpers/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";

const createUserIntoDB = async (payload: IUser) => {
  const { email, ...rest } = payload;
  const isUserExist = await User.find({ email });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exist");
  }

  const user = await User.create({ email, ...rest });
  return user;
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
