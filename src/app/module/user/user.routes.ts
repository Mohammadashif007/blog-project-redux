import express from "express";
import { UserControllers } from "./user.controller";

import { validateRequest } from "../../middleware/validateRequest";
import { createUserZodSchema } from "./user.validation";

const app = express.Router();

app.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserControllers.createUser,
);
app.get("/", UserControllers.getAllUsers);

export const UserRoutes = app;
