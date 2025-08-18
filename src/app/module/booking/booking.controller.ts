// import { Request, Response } from "express";
// import { catchAsync } from "../../utils/catchAsync";
// import { BookingServices } from "./booking.service";
// import { sendResponse } from "../../utils/sendResponse";
// import httpStatus from "http-status-codes";
// import { JwtPayload } from "jsonwebtoken";

import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { BookingServices } from "./booking.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

// const createBooking = catchAsync(async (req: Request, res: Response) => {
//   const decodedToken = req.user as JwtPayload;
//   const booking = await BookingServices.createBooking(
//     req.body,
//     decodedToken.userId
//   );
//   sendResponse(res, {
//     success: true,
//     message: "Booking created successfully",
//     data: booking,
//     statusCode: httpStatus.CREATED,
//   });
// });

// export const BookingControllers = {
//   createBooking,
// };

const createBooking = catchAsync(async (req: Request, res: Response) => {
    const decodedToken = req.user as JwtPayload;
  const result = await BookingServices.createBooking(req.body, decodedToken.userId);
  sendResponse(res, {
    success: true,
    message: "Booking created successfully",
    data: result,
    statusCode: httpStatus.CREATED,
  });
});


export const BookingControllers = {
  createBooking,
};