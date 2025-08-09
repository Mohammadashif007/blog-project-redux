import { BOOKING_STATUS } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { PAYMENT_STATUS } from "./payment.interface";
import { Payment } from "./payment.model";

const successPayment = async (query: Record<string, string>) => {
  // update booking status success
  // update payment status success
  console.log(query);

  const session = await Booking.startSession();
  session.startTransaction();
  try {
    // ! update payment status and payment
    // const updatedPayment = await Payment.findOneAndUpdate(
    //   { transactionId: query.transactionId },
    //   [
    //     {
    //       status: PAYMENT_STATUS.PAID,
    //     },
    //   ],
    //   { new: true, runValidators: true, session },
    // );

    const updatedPayment = await Payment.findOneAndUpdate({
      transactionId: query.transactionId,
    });
    console.log(updatedPayment);

    // ! update booking status and confirm booking
    // await Booking.findByIdAndUpdate(
    //   updatedPayment?.booking,
    //   { status: BOOKING_STATUS.COMPLETE },
    //   { new: true, runValidators: true, session },
    // )
    //   .populate("user", "name email phone address")
    //   .populate("tour", "title castFrom")
    //   .populate("payment");

    // await session.commitTransaction();
    // session.endSession();
    // return { success: true, message: "Payment completed successfully" };
  } catch (error) {}
};
const failPayment = async () => {
  // update booking status fail
  // update payment status fail
};
const cancelPayment = async () => {
  // update booking status cancel
  // update payment status cancel
};

export const PaymentServices = {
  successPayment,
  failPayment,
  cancelPayment,
};
