import express, { Request, Response } from "express";
import cors from "cors";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { BlogRoutes } from "./app/module/blog/blog.routes";
import { UserRoutes } from "./app/module/user/user.router";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/v1", BlogRoutes);
app.use("/api/v1", UserRoutes);

app.use(globalErrorHandler);

export default app;
