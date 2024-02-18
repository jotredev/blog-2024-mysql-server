import express from "express";
import { validatorCreateUser } from "../../validators/user.validator.js";
import { createUser } from "../../controllers/user.controller.js";
const router = express.Router();

router.post("/create", validatorCreateUser, createUser);

export default router;
