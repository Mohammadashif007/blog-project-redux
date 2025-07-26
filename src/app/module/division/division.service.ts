import { AppError } from "../../errorHelpers/AppError";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";
import httpStatus from "http-status-codes";

const createDivisionIntoDB = async (payload: IDivision) => {
  const division = await Division.findOne({ name: payload.name });
  if (division) {
    throw new AppError(httpStatus.BAD_REQUEST, "Division already exist");
  }

  const baseSlug = payload.name.toLocaleLowerCase().split(" ").join("-");
  const slug = `${baseSlug}-division`;
  payload.slug = slug;
  const result = await Division.create(payload);
  return result;
};
const getDivisionFromDB = async () => {
  const result = await Division.find();
  return result;
};
const getSingleDivisionFromDB = async (id: string) => {
  const result = await Division.findById(id);
  return result;
};
const updateDivisionIntoDB = async (
  id: string,
  payload: Partial<IDivision>,
) => {
  const isDivisionExist = await Division.findById(id);

  if (!isDivisionExist) {
    throw new AppError(httpStatus.BAD_GATEWAY, "Division does not exist");
  }

  const duplicateDivision = await Division.findOne({
    name: payload.name,
    _id: { $ne: id },
  });

  if (duplicateDivision) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "A division with this name already exist",
    );
  }

  const result = await Division.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteDivisionFromDB = async (id: string) => {
  await Division.findByIdAndDelete(id);
  return null;
};

export const DivisionServices = {
  createDivisionIntoDB,
  getDivisionFromDB,
  getSingleDivisionFromDB,
  updateDivisionIntoDB,
  deleteDivisionFromDB,
};
