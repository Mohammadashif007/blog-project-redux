import express from "express";
import { UserControllers } from "./user.controller";

const app = express.Router();

app.use("/user", UserControllers.createUser);

export const UserRoutes = app;
