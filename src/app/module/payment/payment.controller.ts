import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { PaymentServices } from "./payment.service";
import config from "../../config";

const successPayment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  console.log(query);
  const result = await PaymentServices.successPayment(
    query as Record<string, string>,
  );

  // if (result?.success) {
  //   res.redirect(config.ssl_success_frontend_url as string);
  // }
});
const failPayment = catchAsync(async (req: Request, res: Response) => {});
const cancelPayment = catchAsync(async (req: Request, res: Response) => {});

export const PaymentController = {
  successPayment,
  failPayment,
  cancelPayment,
};
