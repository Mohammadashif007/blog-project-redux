import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { TourServices } from "./tour.service";
import { sendResponse } from "../../utils/sendResponse";

const createTour = catchAsync(async (req: Request, res: Response) => {
  const tourData = req.body;
  const result = await TourServices.createTourIntoDB(tourData);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Tour created successfully",
    data: result,
  });
});

export const TourControllers = {
  createTour,
};
