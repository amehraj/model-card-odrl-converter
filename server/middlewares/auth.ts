import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { BadRequest, Forbidden, Unauthorized } from "../utils/httpError.ts";
import dotenv from "dotenv";

import { Entity } from "../models/index.ts";

dotenv.config();

export const authenticateEntity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies?.token;
  if (!token) {
    return next();
  }

  const cookieOptions = { ...res.app.get("cookieOptions"), signed: true };

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "");
  if (!decodedToken || typeof decodedToken === "string") {
    res.clearCookie("token", cookieOptions);
    throw new Forbidden("Invalid token");
  }

  const entity = await Entity.findOne({ email: decodedToken.email });
  if (!entity) {
    res.clearCookie("token", cookieOptions);
    throw new Forbidden("Unknown user");
  }

  req.entity = entity;
  const { name, email } = entity.toJSON();
  res.cookie(
    "token",
    jwt.sign({ name, email }, process.env.JWT_SECRET || ""),
    cookieOptions
  );
  next();
};

export const checkReAuthBadRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const entity = req.entity;

  if (entity) {
    throw new BadRequest("Logout before login/sign up");
  }

  next();
};

export const checkAuthState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const entity = req.entity;

  if (!entity) {
    throw new Unauthorized("You must be logged in to perform this action.");
  }

  next();
};
