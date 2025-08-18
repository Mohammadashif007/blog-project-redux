import express from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createBookingZodSchema,
  updateBookingStatusZodSchema,
} from "./booking.validation";
import { BookingControllers } from "./booking.controller";

const router = express.Router();

router.post(
  "/",
  checkAuth(...Object.values(Role)),
  validateRequest(createBookingZodSchema),
  BookingControllers.createBooking,
);

router.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  BookingControllers.getAllBookings,
);

router.get(
  "/my-bookings",
  checkAuth(...Object.values(Role)),
  BookingControllers.getMyBookings,
);

router.get(
  "/:bookingId",
  checkAuth(...Object.values(Role)),
  BookingControllers.getSingleBooking,
);

router.patch(
  "/:bookingId",
  checkAuth(...Object.values(Role)),
  validateRequest(updateBookingStatusZodSchema),
  BookingControllers.updateBooking,
);

export const BookingRoutes = router;
