import { TBlogPost } from "./blog.interface";
import { BlogPost } from "./blog.model";

const getSinglePostFromDB = async (id: string) => {
  const result = await BlogPost.findById(id);
  return result;
};
const getBlogPostFromDB = async () => {
  const result = await BlogPost.find();
  return result;
};
const createPostIntoDB = async (payload: TBlogPost) => {
  const result = await BlogPost.create(payload);
  return result;
};
const editPostIntoDB = async (id: string, payload: Partial<TBlogPost>) => {
  const result = await BlogPost.findByIdAndUpdate(id, payload, { new: true });
  console.log(result);
  return result;
};
const deletePostFromDB = async (id: string) => {
  const result = await BlogPost.findByIdAndDelete(id);
  return result;
};

export const BlogPostServices = {
  getBlogPostFromDB,
  createPostIntoDB,
  deletePostFromDB,
  getSinglePostFromDB,
  editPostIntoDB,
};
