/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errorHelpers/AppError";
import { success, ZodError } from "zod";
import config from "../config";
import { issue } from "zod/v4/core/util.cjs";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Something went wrongggg";
  const errorSources: any = [];

  // ! duplicate error
  if (err.code === 11000) {
    statusCode = 400;
    const matchedArray = err.message.match(/"([^"]*)"/);
    message = `${matchedArray[1]} already exist`;
  }

  // !Object id error
  else if (err.name === "CastError") {
    statusCode = 401;
    message = "Invalid mongodb object id. Please provide a valid ID";
  }

  // ! mongoose validation Error
  else if (err.name === "ValidationError") {
    statusCode = 401;
    const errors = Object.values(err.errors);
    message = "Validation error";
    errors.forEach((errorObject: any) =>
      errorSources.push({
        path: errorObject.path,
        message: errorObject.message,
      }),
    );
  }

  //! Zod error
  else if (err.name === "ZodError") {
    statusCode = 400;
    message = "Zod error occurred";
    err = err.issues;
    err.forEach((issue: any) =>
      errorSources.push({ path: issue.path[0], message: issue.message }),
    );
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }
  res.status(statusCode).json({
    success: false,
    message: message,
    errorSources,
    // err,

    stack: config.node_env === "development" ? err.stack : null,
  });
};
