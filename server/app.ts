import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.ts";
import { authenticateEntity } from "./middlewares/auth.ts";
import {
  modelCardRouter,
  modelCardContentRouter,
  entityRouter,
} from "./routers/index.ts";

dotenv.config();

const app = express();

const cookieOptions = {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, // one week
  path: "/",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  secure: process.env.NODE_ENV === "production",
};
const cookieSecret = process.env.COOKIE_SECRET;

app.set("cookieOptions", cookieOptions);
app.set("cookieSecret", cookieSecret);

// middlewares
app.use(cookieParser(cookieSecret));
app.use(authenticateEntity);
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

// routes
app.use("/api/model-card", modelCardRouter);
app.use("/api/model-card-content", modelCardContentRouter);
app.use("/api/entity", entityRouter);

// error
app.use(errorHandler);

export default app;
