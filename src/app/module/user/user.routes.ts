import express from "express";
import { UserControllers } from "./user.controller";

import { validateRequest } from "../../middleware/validateRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";

import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "./user.interface";

const app = express.Router();

app.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserControllers.createUser,
);
app.patch(
  "/:userId",
  validateRequest(updateUserZodSchema),
  checkAuth(...Object.values(Role)),
  UserControllers.updateUser,
);
app.get(
  "/all-users",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  UserControllers.getAllUsers,
);

export const UserRoutes = app;
