/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import { AppError } from "../errorHelpers/AppError";
import config from "../config";
import { handleZodError } from "../helpers/handleZodError";
import { handleValidationError } from "../helpers/handleValidationError";
import { handleCastError } from "../helpers/handleCastError";
import { handleDuplicateError } from "../helpers/handleDuplicateError";
import { TErrorSources } from "../interfaces/error.types";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // if (config.node_env === "development") {
  //   console.log(err);
  // }

  let statusCode = 500;
  let message = "Something went wrongggg";
  let errorSources: TErrorSources[] = [];

  // ! duplicate error
  if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }

  // !Object id error
  else if (err.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }

  // ! mongoose validation Error
  else if (err.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources as TErrorSources[];
  }

  //! Zod error
  else if (err.name === "ZodError") {
    const simplifiedError = handleZodError(err);
    errorSources = simplifiedError.errorSources as TErrorSources[];
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }

  // ! Custom AppError
  else if (err instanceof AppError) {
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
    err: config.node_env === "development" ? err : null,
    stack: config.node_env === "development" ? err.stack : null,
  });
};
