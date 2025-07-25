import { IDivision } from "./division.interface";
import { Division } from "./division.model";

const createDivisionIntoDB = async (payload: IDivision) => {
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
const updateDivisionIntoDB = async (id: string, payload: IDivision) => {
  const result = await Division.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteDivisionFromDB = async (id: string) => {
  const result = await Division.findByIdAndUpdate(id);
  return result;
};



export const DivisionServices = {
  createDivisionIntoDB,
  getDivisionFromDB,
  getSingleDivisionFromDB,
  updateDivisionIntoDB,
  deleteDivisionFromDB
};
