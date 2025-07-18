import { Types } from "mongoose";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  SUPER_ADMIN = "SUPER-ADMIN",
  AUTHOR = "AUTHOR",
}

export interface IAuthProvider {
  provider: string;
  providerId: string;
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCK = "BLOCKED",
}

export interface IUser {
  name: string;
  email: string;
  password?: string;
  role: Role;
  phone?: string;
  address?: string;
  picture?: string;
  isActive?: IsActive;
  isDeleted?: boolean;
  isVerified?: boolean;
  auths: IAuthProvider[];
  blog?: Types.ObjectId[];
}
