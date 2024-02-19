import express from "express";
import {
  createPost,
  getPostById,
  getPosts,
} from "../../controllers/post.controller.js";
import { checkAuth } from "../../middlewares/user.middleware.js";
import { validatorCreatePost } from "../../validators/post.validator.js";
const router = express.Router();

router.post("/create", validatorCreatePost, checkAuth, createPost);
router.get("/", checkAuth, getPosts);
router.get("/:id", checkAuth, getPostById);

export default router;
