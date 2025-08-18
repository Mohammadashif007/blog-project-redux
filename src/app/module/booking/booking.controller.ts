import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { BookingServices } from "./booking.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const result = await BookingServices.createBooking(
    req.body,
    decodedToken.userId,
  );
  sendResponse(res, {
    success: true,
    message: "Booking created successfully",
    data: result,
    statusCode: httpStatus.CREATED,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.getAllBookings();
  sendResponse(res, {
    success: true,
    message: "Retrieve all Bookings successfully",
    data: result,
    statusCode: httpStatus.CREATED,
  });
});

const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.getMyBookings();
  sendResponse(res, {
    success: true,
    message: "Retrieve my Bookings successfully",
    data: result,
    statusCode: httpStatus.CREATED,
  });
});

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.getSingleBooking();
  sendResponse(res, {
    success: true,
    message: "Retrieve Single Booking successfully",
    data: result,
    statusCode: httpStatus.OK,
  });
});

const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.updateBooking();
  sendResponse(res, {
    success: true,
    message: "Booking updated successfully",
    data: result,
    statusCode: httpStatus.OK,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getMyBookings,
  getSingleBooking,
  updateBooking,
};
