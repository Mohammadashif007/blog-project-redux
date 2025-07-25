/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorResponse, TErrorSources } from "../interfaces/error.types";

// ! handle zod error
export const handleZodError = (err: any): TErrorResponse => {
  const errorSources: TErrorSources[] = [];
  err.issues.forEach((issue: any) => {
    errorSources.push({
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    });
  });
  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};