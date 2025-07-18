import express from "express";
import { UserControllers } from "./user.controller";

const app = express.Router();

app.post("/register", UserControllers.createUser);
app.get("/", UserControllers.getAllUsers);

export const UserRoutes = app;
