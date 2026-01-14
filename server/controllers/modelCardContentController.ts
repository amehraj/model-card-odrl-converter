import { Request, Response } from "express";
import { Unauthorized, NotFound } from "../utils/httpError.ts";
import { ModelCard, ModelCardContent } from "../models/index.ts";

export const createModelCardContent = async (req: Request, res: Response) => {
  const { modelCardId } = req.params;

  const modelCard = await ModelCard.findById(modelCardId);

  if (!modelCard) {
    throw new NotFound(
      "No model card found. Each content piece should be associated with one and only one model card."
    );
  }

  const modelCardContent = new ModelCardContent({
    ...req.body,
  });

  const newModelCardContent = await ModelCardContent.create(modelCardContent);

  Object.assign(modelCard, {
    content: newModelCardContent._id,
    isOdrlUpdate: false,
  });

  await modelCard.save();

  res.status(201).json(newModelCardContent);
};

export const updateModelCardContent = async (req: Request, res: Response) => {
  const { id } = req.params;

  const modelCardContent = await ModelCardContent.findById(id);
  const modelCard = await ModelCard.findOne({ content: id });

  if (!modelCard || !modelCardContent) {
    throw new NotFound("No model card found!");
  }

  if (req.entity?._id !== modelCard.entity) {
    throw new Unauthorized(
      "You have no authorization to edit this model card!"
    );
  }

  Object.assign(modelCardContent, req.body);

  Object.assign(modelCard, {
    isOdrlUpdate: false,
  });

  await modelCard.save();
  await modelCardContent.save();

  res.status(200).json(modelCardContent);
};
