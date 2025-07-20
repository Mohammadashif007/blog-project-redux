import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFoundRoute } from "./app/middleware/notFoundRoute";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/v1", router);

app.use(globalErrorHandler);
app.use(notFoundRoute);

export default app;
