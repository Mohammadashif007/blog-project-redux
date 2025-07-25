/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TErrorResponse, TErrorSources } from "../interfaces/error.types";

// ! handle validation error
export const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TErrorResponse => {
  const errorSources: TErrorSources[] = [];
  const errors = Object.values(err.errors);
  errors.forEach((errorObject: any) =>
    errorSources.push({
      path: errorObject.path,
      message: errorObject.message,
    }),
  );
  return {
    statusCode: 401,
    message: "Validation error",
    errorSources,
  };
};