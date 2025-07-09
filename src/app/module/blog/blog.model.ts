import { model, Schema } from "mongoose";
import { TBlogPost } from "./blog.interface";

const blogSchema = new Schema<TBlogPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const BlogPost = model<TBlogPost>("Blog", blogSchema);
