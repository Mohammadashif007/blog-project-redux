import { Types } from "mongoose";

export interface ITourType {
  name: string;
}

export interface ITour {
  title: string;
  slug: string;
  description?: string;
  image?: string[];
  location?: string;
  castFrom?: number;
  startDate?: Date;
  endDate?: Date;
  included?: string[];
  excluded?: string[];
  amenities?: string[];
  tourPlan?: string;
  maxGuest?: number;
  minAge?: number;
  departureLocation: string;
  arrivalLocation: string;
  division: Types.ObjectId;
  tourType: Types.ObjectId;
}
