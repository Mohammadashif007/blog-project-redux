import express from "express";
import { UserControllers } from "./user.controller";

const app = express.Router();

app.use("/register", UserControllers.createUser);

export const UserRoutes = app;
