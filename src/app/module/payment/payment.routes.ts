import express from "express";
import { PaymentControllers } from "./payment.controller";

const router = express.Router();

router.post("/success", PaymentControllers.paymentSuccess);
router.post("/fail", PaymentControllers.paymentFail);
router.post("/cancel", PaymentControllers.paymentCancel);

export const PaymentRoutes = router;
