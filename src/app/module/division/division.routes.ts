// import { Router } from "express";
// import { DivisionControllers } from "./division.controller";
// import { validateRequest } from "../../middleware/validateRequest";
// import { createDivisionSchema } from "./division.validation";

// const router = Router();

// router.post(
//   "/create",
//   validateRequest(createDivisionSchema),
//   DivisionControllers.createDivision,
// );
// // router.get("/", DivisionControllers.allDivision);
// router.get("/:divisionId", DivisionControllers.getSingleDivision);
// router.patch("/:divisionId", DivisionControllers.getSingleDivision);
// router.delete("/:divisionId", DivisionControllers.getSingleDivision);

// export const DivisionRoutes = router;

import express from "express";
import { DivisionControllers } from "./division.controller";

const router = express.Router();

router.post("/create", DivisionControllers.createDivision)

export const DivisionRoutes = router;
