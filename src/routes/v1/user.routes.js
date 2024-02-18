import express from "express";
import {
  validatorCreateUser,
  validatorLogin,
} from "../../validators/user.validator.js";
import {
  createUser,
  getProfile,
  login,
} from "../../controllers/user.controller.js";
import { checkAuth } from "../../middlewares/user.middleware.js";
const router = express.Router();

router.post("/create", validatorCreateUser, createUser);
router.post("/login", validatorLogin, login);
router.get("/get-me", checkAuth, getProfile);

export default router;
