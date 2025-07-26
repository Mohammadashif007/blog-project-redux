import { AppError } from "../../errorHelpers/AppError";
import { ITour } from "./tour.interface";
import { Tour } from "./tour.model";
import httpStatus from "http-status-codes";

const createTourIntoDB = async (payload: ITour) => {
  const isExistTour = await Tour.findOne({ title: payload.title });
  if(isExistTour){
    throw new AppError(httpStatus.BAD_REQUEST, "Tour already exist")
  }
  const result = await Tour.create(payload);
  return result;
};



export const TourServices = {
  createTourIntoDB,
};
