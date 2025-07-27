import { model, Schema } from "mongoose";
import { ITour, ITourType } from "./tour.interface";

const tourTypeSchema = new Schema<ITourType>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export const TourType = model<ITourType>("TourType", tourTypeSchema);

const tourSchema = new Schema<ITour>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String },
    image: { type: String },
    location: { type: String },
    castFrom: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    included: { type: [String], default: [] },
    excluded: { type: [String], default: [] },
    amenities: { type: [String], default: [] },
    tourPlan: { type: [String], default: [] },
    maxGuest: { type: Number },
    minAge: { type: Number },
    departureLocation: { type: String },
    arrivalLocation: { type: String },
    division: { type: Schema.Types.ObjectId, ref: "Division", required: true },
    tourType: { type: Schema.Types.ObjectId, ref: "TourType", required: true },
  },
  { timestamps: true },
);

tourSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    const baseSlug = this.title.toLocaleLowerCase().split(" ").join("-");
    let slug = `${baseSlug}-tour`;
    let count = 0;
    while ( await Tour.exists({ slug })) {
      
      slug = `${slug}-tour-${count++}`;
    }
    this.slug = slug;
  }
  next();
});

// tourSchema.pre("findOneAndUpdate", async function (next) {
//   const tour = this.getUpdate() as Partial<ITour>;
//   if (tour.title) {
//     const baseSlug = tour.title.toLocaleLowerCase().split(" ").join("-");
//     let slug = `${baseSlug}-tour`;
//     let count = 0;
//     while (await Tour.exists({ slug })) {
//       slug = `${slug}-${count++}`;
//     }
//     tour.slug = slug;
//   }
//   next();
// });

export const Tour = model<ITour>("Tour", tourSchema);
