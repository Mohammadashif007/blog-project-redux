import { AppError } from "../../errorHelpers/AppError";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";
import httpStatus from "http-status-codes";

const createTourIntoDB = async (payload: ITour) => {
  const isExistTour = await Tour.findOne({ title: payload.title });
  if (isExistTour) {
    throw new AppError(httpStatus.BAD_REQUEST, "Tour already exist");
  }

  const result = await Tour.create(payload);
  return result;
};

const updateTourIntoDB = async (id: string, payload: Partial<ITour>) => {
  const isTourExist = await Tour.findById(id);
  if (!isTourExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Tour not exist");
  }

  // if (payload.title) {
  //   const baseSlug = payload.title.toLocaleLowerCase().split(" ").join("-");
  //   let slug = `${baseSlug}-division`;
  //   let count = 0;
  //   while (await Tour.exists({ slug })) {
  //     slug = `${slug}-${count++}`;
  //   }
  //   payload.slug = slug;
  // }

  const result = await Tour.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteTour = async (id: string) => {
  const isExistTour = await Tour.findById(id);
  if (!isExistTour) {
    throw new AppError(httpStatus.BAD_REQUEST, "tour does not exist");
  }
  await Tour.findByIdAndDelete(id);
  return null;
};

const getAllTourFromDB = async (query: Record<string, string>) => {
  const filter = query;
  const tours = await Tour.find(filter);
  return tours;
};

// !------------ Tour Types services -------------//

const createTourTypeIntoDB = async (payload: ITourType) => {
  const isExistTourType = await TourType.findOne({ name: payload.name });
  if (isExistTourType) {
    throw new AppError(httpStatus.BAD_REQUEST, "tour type already exist");
  }
  const tourType = await TourType.create(payload);
  return tourType;
};

const updateTourTypeIntoDB = async (
  id: string,
  payload: Partial<ITourType>,
) => {
  const isExistTourType = await TourType.findById(id);
  if (!isExistTourType) {
    throw new AppError(httpStatus.BAD_REQUEST, "tour type dose not exist");
  }
  const isDuplicate = await TourType.findOne({
    name: payload.name,
    _id: { $ne: id },
  });
  if (isDuplicate) {
    throw new AppError(httpStatus.BAD_REQUEST, "tour type already exist");
  }
  const tourType = await TourType.findByIdAndUpdate(id);
  return tourType;
};

const deleteTourTypeFromDB = async (id: string) => {
  const isExistTourType = await TourType.findById(id);
  if (!isExistTourType) {
    throw new AppError(httpStatus.BAD_REQUEST, "This tour dose not exist");
  }
  const tourType = await TourType.findByIdAndDelete(id);
  return tourType;
};

const getAllTourTypeFromDB = async () => {
  const tourType = await TourType.find();
  return tourType;
};

export const TourServices = {
  createTourIntoDB,
  updateTourIntoDB,
  deleteTour,
  getAllTourFromDB,
  createTourTypeIntoDB,
  getAllTourTypeFromDB,
  updateTourTypeIntoDB,
  deleteTourTypeFromDB,
};
