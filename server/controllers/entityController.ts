import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { Entity } from "../models/index.ts";
import { BadRequest, Forbidden, NotFound } from "../utils/httpError.js";

export const entityRegister = async (req: Request, res: Response) => {
  const saltRounds = 10;
  const { name, email, password, ...rest } = req.body;

  const entity = await Entity.findOne({ email });

  if (entity) {
    throw new BadRequest("User already exists");
  }
  if (!password || password.length <= 8) {
    throw new BadRequest("Password must be at least 8 characters");
  }
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newEntity = new Entity({
    email,
    passwordHash,
    name,
    ...rest,
  });

  await newEntity.save();

  const accessToken = jwt.sign({ name, email }, process.env.JWT_SECRET || "");
  res.cookie("token", accessToken, {
    ...res.app.get("cookieOptions"),
    signed: true,
  });

  res.status(201).json(newEntity);
};

export const entityLogin = async (req: Request, res: Response) => {
  const entity = await Entity.findOne({ email: req.body.email });
  const validCredentials = !entity
    ? false
    : await bcrypt.compare(req.body.password, entity.passwordHash);
  if (!(entity && validCredentials)) {
    throw new BadRequest("Invalid credentials");
  }

  const { name, email } = entity;

  const accessToken = jwt.sign({ name, email }, process.env.JWT_SECRET || "");
  res.cookie("token", accessToken, {
    ...res.app.get("cookieOptions"),
    signed: true,
  });

  res.json(entity);
};

export const entityLogout = async (req: Request, res: Response) => {
  const { maxAge, restOptions } = res.app.get("cookieOptions");
  if (req.entity) {
    res.clearCookie("token", { ...restOptions, signed: true });
  }
  res.status(201).json({ message: "User logged out!" });
};

export const getCurrentEntity = (req: Request, res: Response) => {
  if (!req.entity) return res.json(null);
  res.json(req.entity);
};

export const getAllEntities = async (req: Request, res: Response) => {
  const entities = await Entity.find({});

  res.json(entities);
};

export const getEntityById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const entity = await Entity.findById(id);
  if (!entity) {
    throw new NotFound("Entity not found");
  }
  res.json(entity);
};

export const updateEntity = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (req.entity?._id !== id) {
    throw new Forbidden("You do not have permission to update this user");
  }
  const entity = await Entity.findByIdAndUpdate(id, req.body);
  if (!entity) {
    throw new NotFound("User not found");
  }
  res.json(entity);
};
