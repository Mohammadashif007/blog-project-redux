import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { PaymentServices } from "./payment.service";
import config from "../../config";

const paymentSuccess = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await PaymentServices.successPayment(
      query as Record<string, string>,
    );
    console.log(result);
    if (result.success) {
        console.log("redirect from here");
      res.redirect(config.ssl_success_frontend_url as string);
    }
  },
);
const paymentFail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const paymentCancel = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const PaymentControllers = {
  paymentSuccess,
  paymentFail,
  paymentCancel,
};
