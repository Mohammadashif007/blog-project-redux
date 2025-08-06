import { excludeField } from "../../constant";
import { AppError } from "../../errorHelpers/AppError";
import { tourSearchableFields } from "./tour.constant";
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
  const searchTerm = query.searchTerm || "";
  const sort = query.sort || "-createdAt";
  const fields = query.fields?.split(",").join(" ") || "";
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  for (const field of excludeField) {
    delete filter[field];
  }

  const searchQuery = {
    $or: tourSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  };
  // const tours = await Tour.find(searchQuery)
  //   .find(filter)
  //   .sort(sort)
  //   .select(fields)
  //   .skip(skip)
  //   .limit(limit);

  const filterQuery = Tour.find(filter);
  const tours = filterQuery.find(searchQuery);
  const allTours = await tours
    .sort(sort)
    .select(fields)
    .skip(skip)
    .limit(limit);

  const totalTours = await Tour.countDocuments();
  const totalPage = Math.ceil(totalTours / limit);

  const meta = {
    page: page,
    limit: limit,
    total: totalTours,
    totalPage: totalPage,
  };
  return {
    meta,
    data: allTours,
  };
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
