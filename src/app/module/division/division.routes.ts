import { Router } from "express";
import { DivisionControllers } from "./division.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createDivisionSchema } from "./division.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post(
  "/create",
  validateRequest(createDivisionSchema),
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  DivisionControllers.createDivision,
);
router.get("/", DivisionControllers.allDivision);
router.get("/:divisionId", DivisionControllers.getSingleDivision);
router.patch(
  "/:divisionId",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  DivisionControllers.updateSingleDivision,
);
router.delete(
  "/:divisionId",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  DivisionControllers.getSingleDivision,
);

export const DivisionRoutes = router;
