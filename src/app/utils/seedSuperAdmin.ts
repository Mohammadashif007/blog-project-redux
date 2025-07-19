import config from "../config";

import { User } from "../module/user/user.model";

import bcrypt from "bcrypt";
import { IAuthProvider, IUser, Role } from "../module/user/user.interface";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      email: config.super_admin_email,
    });
    if (isSuperAdminExist) {
      console.log("Super admin already exist");
    }

    const hashedPassword = await bcrypt.hash(
      config.super_admin_password as string,
      Number(config.bcrypt_salt_round),
    );

    const authProvider: IAuthProvider = {
      provider: "credentials",
      providerId: config.super_admin_email as string,
    };

    const payload: IUser = {
      name: "Super Admin",
      email: config.super_admin_email as string,
      password: hashedPassword as string,
      role: Role.SUPER_ADMIN,
      isVerified: true,
      auths: [authProvider],
    };

    const superAdmin = await User.create(payload);
    console.log("Super Admin Created Successfully \n");
    console.log(superAdmin);
  } catch (error) {
    console.log(error);
  }
};
