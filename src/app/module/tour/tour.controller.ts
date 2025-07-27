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

const updateTour = catchAsync(async (req: Request, res: Response) => {
  const tourData = req.body;

  const { id } = req.params;
  const result = await TourServices.updateTourIntoDB(id, tourData);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Tour updated successfully",
    data: result,
  });
});

const deleteTour = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TourServices.deleteTour(id);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Tour delete successfully",
    data: result,
  });
});

const getAllTour = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const tours = await TourServices.getAllTourFromDB(
    query as Record<string, string>,
  );
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Tour retrieve successfully",
    data: tours,
  });
});

// !------------ Tour Types services -------------//

const createTourType = catchAsync(async (req: Request, res: Response) => {
  const tourType = req.body;
  const result = await TourServices.createTourTypeIntoDB(tourType);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Tour Type created successfully",
    data: result,
  });
});

const getAllTourType = catchAsync(async (req: Request, res: Response) => {
  const tours = await TourServices.getAllTourTypeFromDB();
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "All Tour type retrieve successfully",
    data: tours,
  });
});

const updateTourType = catchAsync(async (req: Request, res: Response) => {
  const tourTypeData = req.body;
  const { id } = req.params;
  const result = await TourServices.updateTourTypeIntoDB(id, tourTypeData);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Tour type updated successfully",
    data: result,
  });
});

const deleteTourType = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TourServices.deleteTourTypeFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Tour type deleted successfully",
    data: result,
  });
});

export const TourControllers = {
  createTour,
  updateTour,
  deleteTour,
  getAllTour,
  createTourType,
  getAllTourType,
  updateTourType,
  deleteTourType,
};
