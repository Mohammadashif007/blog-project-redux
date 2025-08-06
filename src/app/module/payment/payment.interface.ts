/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from "mongoose";

export enum PAYMENT_STATUS {
  PAID = "PAID",
  UNPAID = "UNPAID",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  REFUND = "REFUND",
}

export interface IPayment {
  tour: Types.ObjectId;
  transactionId: string;
  amount: number;
  paymentGetWayData?: any;
  invoiceUrl?: string;
  status: PAYMENT_STATUS;
}
