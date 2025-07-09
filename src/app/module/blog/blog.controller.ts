import { NextFunction, Request, Response } from "express";
import { BlogPostServices } from "./blog.service";

const getBlogPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BlogPostServices.getBlogPostFromDB();
    res.status(200).json({
      success: true,
      message: "Retrieve blog post",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSinglePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await BlogPostServices.getSinglePostFromDB(id);
    res.status(200).json({
      success: true,
      message: "Single post Retrieve successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const result = await BlogPostServices.createPostIntoDB(payload);
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await BlogPostServices.deletePostFromDB(id);
    res.status(201).json({
      success: true,
      message: "Delete post successfully",
      data: [],
    });
  } catch (error) {
    next(error);
  }
};

export const BlogControllers = {
  getBlogPost,
  createPost,
  deletePost,
  getSinglePost,
};
