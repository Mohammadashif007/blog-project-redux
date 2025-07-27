import express from "express";
import { TourControllers } from "./tour.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createTourTypeZodSchema,
  createTourZodSchema,
  updateTourTypeZodSchema,
  updateTourZodSchema,
} from "./tour.validation";

const router = express.Router();

// !------------ Tour Types route -------------//

router.post(
  "/create-tour-type",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createTourTypeZodSchema),
  TourControllers.createTourType,
);

router.patch(
  "/tour-type/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updateTourTypeZodSchema),
  TourControllers.updateTourType,
);

router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  TourControllers.updateTourType,
);


router.get("/tour-types", TourControllers.getAllTourType);


// !------------ Tour -------------//

router.get("/", TourControllers.getAllTour);

router.post(
  "/create",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createTourZodSchema),
  TourControllers.createTour,
);

router.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updateTourZodSchema),
  TourControllers.updateTour,
);

router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  TourControllers.deleteTour,
);

export const TourRoutes = router;
