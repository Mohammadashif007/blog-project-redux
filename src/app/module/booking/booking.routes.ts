import express from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import { BookingControllers } from "./booking.controller";

const router = express.Router();

// ! create booking
router.post(
  "/",
  checkAuth(...Object.values(Role)),
  BookingControllers.createBooking,
);

// ! get all booking by admin and super admin
router.get("/", checkAuth(Role.ADMIN, Role.SUPER_ADMIN));

// ! get my booking
router.get("/my-bookings", checkAuth(...Object.values(Role)));

// ! get single booking
router.get("/:bookingId", checkAuth(...Object.values(Role)));

// ! update booking status after payment
router.patch("/:booking/status", checkAuth(...Object.values(Role)));

export const bookingRoutes = router;
