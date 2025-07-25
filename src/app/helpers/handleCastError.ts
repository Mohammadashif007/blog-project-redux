import mongoose from "mongoose";
import { TErrorResponse } from "../interfaces/error.types";

// ! handle cast error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleCastError = (err: mongoose.Error.CastError): TErrorResponse => {
  return {
    statusCode: 400,
    message: "Invalid mongodb object id. Please provide a valid ID",
  };
};