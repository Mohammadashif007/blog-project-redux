/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppError } from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import { BOOKING_STATUS, IBooking } from "./booking.interface";
import httpStatus from "http-status-codes";
import { Booking } from "./booking.model";
import { Payment } from "../payment/payment.model";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { Tour } from "../tour/tour.model";
import { sslService } from "../sslCommerz/sslCommerz.service";
import { ISSLCommerz } from "../sslCommerz/sslCommerz.interface";

const getTransactionId = () => {
  return `TnX_${Date.now()}-${Math.ceil(Math.random() * 1000)}`;
};

const createBooking = async (payload: Partial<IBooking>, userId: string) => {
  const transactionId = getTransactionId();

  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userId);
    if (!user?.phone || !user.address) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Please update your profile before book a tour",
      );
    }

    const tour = await Tour.findById(payload?.tour).select("castFrom");
    if (!tour?.castFrom) {
      throw new AppError(httpStatus.NOT_FOUND, "tour cast not found");
    }

    const totalAmount = Number(tour?.castFrom) * Number(payload.guestCount);

    // !booking creation
    const booking = await Booking.create(
      [
        {
          user: userId,
          status: BOOKING_STATUS.PENDING,
          ...payload,
        },
      ],
      { session },
    );

    // ! payment creation
    const payment = await Payment.create(
      [
        {
          booking: booking[0]._id,
          transactionId: transactionId,
          status: PAYMENT_STATUS.UNPAID,
          amount: totalAmount,
        },
      ],
      { session },
    );

    const updatedBooking = await Booking.findByIdAndUpdate(
      booking[0]._id,
      {
        payment: payment[0]._id,
      },
      { new: true, runValidators: true, session },
    )
      .populate("user", "name email phone address")
      .populate("tour", "title castFrom")
      .populate("payment");

    const userAddress = (updatedBooking?.user as any).address;
    const userEmail = (updatedBooking?.user as any).email;
    const userPhone = (updatedBooking?.user as any).phone;
    const userName = (updatedBooking?.user as any).name;

    const sslPayload: ISSLCommerz = {
      address: userAddress,
      email: userEmail,
      phoneNumber: userPhone,
      name: userName,
      amount: totalAmount,
      transactionId: transactionId,
    };

    const sslPayment = await sslService.sslPaymentInit(sslPayload);


    await session.commitTransaction();
    session.endSession();
    return { booking: updatedBooking, paymentUrl: sslPayment.GatewayPageURL };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getAllBookings = async () => {
  return {};
};

const getBookingById = async () => {
  return {};
};

const updateBookingStatus = async () => {
  return {};
};

const getUserBookings = async () => {
  return {};
};

export const BookingServices = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  getUserBookings,
};
