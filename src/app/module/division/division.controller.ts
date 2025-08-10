import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { DivisionServices } from "./division.service";
import { sendResponse } from "../../utils/sendResponse";
import { IDivision } from "./division.interface";

const createDivision = catchAsync(async (req: Request, res: Response) => {
  console.log("file", req.file);
  console.log("form data", req.body);

  const payload: IDivision = {
    ...req.body,
    thumbnail: req.file?.path
  }

  // const divisionData = req.body;

  const result = await DivisionServices.createDivisionIntoDB(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Division created successfully",
    data: result
  });
});

const allDivision = catchAsync(async (req: Request, res: Response) => {
  const result = await DivisionServices.getDivisionFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All division retrieve successfully",
    data: result,
  });
});

const getSingleDivision = catchAsync(async (req: Request, res: Response) => {
  const { divisionId } = req.params;
  const result = await DivisionServices.getSingleDivisionFromDB(divisionId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Single division retrieve successfully",
    data: result,
  });
});

const updateSingleDivision = catchAsync(async (req: Request, res: Response) => {
  const { divisionId } = req.params;
  const payload = req.body;
  const result = await DivisionServices.updateDivisionIntoDB(
    divisionId,
    payload,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Single division updated successfully",
    data: result,
  });
});
const deleteSingleDivision = catchAsync(async (req: Request, res: Response) => {
  const { divisionId } = req.params;

  const result = await DivisionServices.deleteDivisionFromDB(divisionId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "delete Single division successfully",
    data: result,
  });
});

export const DivisionControllers = {
  createDivision,
  allDivision,
  getSingleDivision,
  updateSingleDivision,
  deleteSingleDivision,
};
