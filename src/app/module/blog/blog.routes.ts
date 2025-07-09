import express from "express";
import { BlogControllers } from "./blog.controller";

const router = express.Router();

router.get("/posts/:id", BlogControllers.getSinglePost);
router.get("/posts", BlogControllers.getBlogPost);
router.post("/posts", BlogControllers.createPost);
router.delete("/posts/:id", BlogControllers.deletePost);

export const BlogRoutes = router;
