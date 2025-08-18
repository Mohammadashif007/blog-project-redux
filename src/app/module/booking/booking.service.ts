// import { AppError } from "../../errorHelpers/AppError";
// import { User } from "../user/user.model";
// import { BOOKING_STATUS, IBooking } from "./booking.interface";
// import httpStatus from "http-status-codes";
// import { Booking } from "./booking.model";
// import { Payment } from "../payment/payment.model";
// import { PAYMENT_STATUS } from "../payment/payment.interface";
// import { Tour } from "../tour/tour.model";

import { AppError } from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import { IBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import httpStatus from "http-status-codes";

// const getTransactionId = () => {
//   return `Tnx_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
// };

// const createBooking = async (payload: Partial<IBooking>, userId: string) => {
//   const transactionId = getTransactionId();

//   const user = await User.findById(userId);
//   if (!user?.phone || !user?.address) {
//     throw new AppError(httpStatus.BAD_GATEWAY, "Please update your profile");
//   }

//   const booking = await Booking.create({
//     userId: user._id,
//     status: BOOKING_STATUS.PENDING,
//     ...payload,
//   });

//     const tour = await Tour.findById(payload.tour).select("castFrom");
//     if(!tour?.castFrom){
//         throw new AppError(httpStatus.BAD_REQUEST, "No tour cast found")
//     }

//   const amount = Number(tour) * Number(payload.guestCount);

//   const payment = await Payment.create({
//     booking: booking._id,
//     transactionId: transactionId,
//     status: PAYMENT_STATUS.UNPAID,
//     amount: amount,
//   });

//   const updateBooking = await Booking.findByIdAndUpdate(
//     booking._id,
//     {
//       payment: payment._id,
//     },
//     { new: true, runValidators: true },
//   );

//   return updateBooking;
// };

// export const BookingServices = {
//   createBooking,
// };

const createBooking = async (payload: IBooking, userId: string) => {
  const user = await User.findById(userId);
  if(!user){
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  }
  const booking = await Booking.create(payload);
  return booking;
};

export const BookingServices = {
  createBooking,
};
