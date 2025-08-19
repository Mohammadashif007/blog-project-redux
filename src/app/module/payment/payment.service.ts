import { BOOKING_STATUS } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { PAYMENT_STATUS } from "./payment.interface";
import { Payment } from "./payment.model";

const successPayment = async (query: Record<string, string>) => {
  const session = await Booking.startSession();
  try {
    const updatedPayment = await Payment.findOneAndUpdate(
      {
        transactionId: query.transactionId,
      },
      { status: PAYMENT_STATUS.PAID },
      { new: true, runValidators: true, session },
    );

    await Booking.findByIdAndUpdate(
      updatedPayment?.booking,
      { status: BOOKING_STATUS.COMPLETE },
      { new: true, runValidators: true, session },
    );

    session.commitTransaction();
    session.endSession();

    return { success: true, message: "Payment completed successfully" };
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const failPayment = async () => {};
const cancelPayment = async () => {};

export const PaymentServices = {
  successPayment,
  failPayment,
  cancelPayment,
};
