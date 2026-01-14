import express from "express";
import {
  entityRegister,
  entityLogin,
  entityLogout,
  getCurrentEntity,
  getEntityById,
  updateEntity,
  getAllEntities,
} from "../controllers/entityController.ts";
import { checkAuthState, checkReAuthBadRequest } from "../middlewares/auth.ts";

const entityRouter = express.Router();

entityRouter.route("/").get(getAllEntities);
entityRouter.route("/register").post(checkReAuthBadRequest, entityRegister);
entityRouter.route("/login").post(checkReAuthBadRequest, entityLogin);
entityRouter.route("/logout").post(checkAuthState, entityLogout);
entityRouter.route("/current").get(getCurrentEntity);
entityRouter.route("/:id").get(getEntityById).put(checkAuthState, updateEntity);

export default entityRouter;
