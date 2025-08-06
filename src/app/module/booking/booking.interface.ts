import { Types } from "mongoose";

export enum BOOKING_STATUS {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  COMPLETE = "COMPLETE",
  FAILED = "FAILED",
}

export interface IBooking {
  tour: Types.ObjectId;
  user?: Types.ObjectId;
  payment?: Types.ObjectId;
  status: BOOKING_STATUS;
  guestCount: number;
}
