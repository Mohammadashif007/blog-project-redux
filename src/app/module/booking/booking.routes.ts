// import express from "express";
// import { checkAuth } from "../../middleware/checkAuth";
// import { Role } from "../user/user.interface";
// import { validateRequest } from "../../middleware/validateRequest";
// import { createBookingZodSchema } from "./booking.validation";
// import { BookingControllers } from "./booking.controller";
import express from "express";
import { BookingControllers } from "./booking.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";

const router = express.Router();

router.post(
  "/",
  checkAuth(...Object.values(Role)),
  BookingControllers.createBooking,
);

export const BookingRoutes = router;
