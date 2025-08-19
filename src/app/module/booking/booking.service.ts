/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppError } from "../../errorHelpers/AppError";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { Payment } from "../payment/payment.model";
import { SSLService } from "../sslCommerz/sslCommerz.service";
import { Tour } from "../tour/tour.model";
import { User } from "../user/user.model";
import { BOOKING_STATUS, IBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import httpStatus from "http-status-codes";

const getTransactionId = () => {
  return `Tnx_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
};

const createBooking = async (payload: Partial<IBooking>, userId: string) => {
  const transactionId = getTransactionId();

  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userId);
    if (!user?.phone || !user?.address) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Update your profile before booking a tour",
      );
    }

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

    const tour = await Tour.findById(payload.tour).select("castFrom");

    if (!tour?.castFrom) {
      throw new AppError(httpStatus.BAD_REQUEST, "No tour cast found");
    }

    const amount = Number(booking[0]?.guestCount) * Number(tour.castFrom!);

    const payment = await Payment.create(
      [
        {
          booking: booking[0]._id,
          transactionId,
          status: PAYMENT_STATUS.UNPAID,
          amount: amount,
        },
      ],
      { session },
    );

    const updateBooking = await Booking.findByIdAndUpdate(
      booking[0]._id,
      { payment: payment[0]._id },
      { new: true, runValidators: true, session },
    )
      .populate("user", "name email phone address")
      .populate("tour", "title castFrom")
      .populate("payment");

    const userAddress = (updateBooking?.user as any).address;
    const userEmail = (updateBooking?.user as any).email;
    const userName = (updateBooking?.user as any).name;
    const userPhone = (updateBooking?.user as any).phone;

    const sslPayload = {
      address: userAddress,
      email: userEmail,
      name: userName,
      phoneNumber: userPhone,
      amount: amount,
      transactionId: transactionId,
    };

    const sslPayment = await SSLService.sslPaymentInit(sslPayload);

    await session.commitTransaction();
    session.endSession();

    return { booking: updateBooking, paymentUrl: sslPayment.GatewayPageURL };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getAllBookings = async () => {
  const bookings = await Booking.find({});
  return bookings;
};

const getMyBookings = async () => {
  const bookings = await Booking.findById({});
  return bookings;
};

const getSingleBooking = async () => {
  const bookings = await Booking.findById({});
  return bookings;
};

const updateBooking = async () => {
  const bookings = await Booking.findByIdAndUpdate({});
  return bookings;
};

export const BookingServices = {
  createBooking,
  getAllBookings,
  getMyBookings,
  getSingleBooking,
  updateBooking,
};
