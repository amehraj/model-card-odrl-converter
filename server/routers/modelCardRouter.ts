import express from "express";
import {
  getAllPublicModelCards,
  getAllModelCardsFromAnEntity,
  getModelCardById,
  createModelCard,
  updateModelCard,
  createModelCardOdrl,
} from "../controllers/modelCardController.ts";
import { checkAuthState } from "../middlewares/auth.ts";

const modelCardRouter = express.Router();

modelCardRouter
  .route("/")
  .get(getAllPublicModelCards)
  .post(checkAuthState, createModelCard);
modelCardRouter
  .route("/:id")
  .get(getModelCardById)
  .put(checkAuthState, updateModelCard);
modelCardRouter.route("/:id/odrl").put(checkAuthState, createModelCardOdrl);
modelCardRouter.route("/entity/:entityId").get(getAllModelCardsFromAnEntity);

export default modelCardRouter;
