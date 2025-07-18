import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: IUser) => {
  const user = await User.create(payload);
  return user;
};

const getAllUsersFromDB = async () => {
  const users = await User.find({});
  return users;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
};
