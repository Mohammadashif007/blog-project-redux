import express from "express";
import { TourControllers } from "./tour.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";

const router = express.Router();

// !------------ Tour -------------//
router.post(
  "/create",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  TourControllers.createTour,
);


export const TourRoutes = router;
