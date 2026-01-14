import express from "express";

import {
  createModelCardContent,
  updateModelCardContent,
} from "../controllers/modelCardContentController.ts";
import { checkAuthState } from "../middlewares/auth.ts";

const modelCardContentRouter = express.Router();

modelCardContentRouter
  .route("/model-card/:modelCardId")
  .post(checkAuthState, createModelCardContent);
modelCardContentRouter
  .route("/:id")
  .put(checkAuthState, updateModelCardContent);

export default modelCardContentRouter;
