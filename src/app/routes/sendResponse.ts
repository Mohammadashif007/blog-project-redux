import { Response } from "express";

type TSendResponse<T> = {
  res: Response;
  statusCode: number;
  message: string;
  success: boolean;
  data?: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
};

export const sendResponse = <T>({
  res,
  statusCode,
  success,
  message,
  data,
  meta,
}: TSendResponse<T>): void => {
  res.status(statusCode).json({ success, message, data, meta });
};
