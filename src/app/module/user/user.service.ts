/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError } from "../../errorHelpers/AppError";
import { IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcrypt from "bcrypt";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";

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

const updateUserIntoDB = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload,
) => {
  const ifUserExist = await User.findById(userId);
  if (!ifUserExist) {
    throw new AppError(httpStatus.BAD_GATEWAY, "User not exist");
  }

  if (payload.role) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.AUTHOR) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You are not authorized to update role",
      );
    }

    if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You are not authorized to update super admin",
      );
    }
  }

  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.AUTHOR) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You are not authorized to update status",
      );
    }
  }

  if (payload.password) {
    payload.password = await bcrypt.hash(
      payload.password,
      Number(config.bcrypt_salt_round),
    );
  }

  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
  return newUpdatedUser;
};

const getAllUsersFromDB = async () => {
  const users = await User.find({});
  const totalUsers = await User.countDocuments();
  return { data: users, meta: { total: totalUsers } };
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  updateUserIntoDB,
};
