//NOTE: This file is only for development purposes and should not be ran under any production circumstances.

import { readFile } from "fs/promises";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

import { connectDatabase, disconnectDatabase } from "./connection.ts";
import { Entity, ModelCard } from "../models/index.ts";

const readJsonFile = async (path: string) => {
  const content = await readFile(new URL(path, import.meta.url), {
    encoding: "utf-8",
  });
  return JSON.parse(content);
};

(async () => {
  await connectDatabase();

  try {
    const entities = await readJsonFile("./mock/entities.json");
    const modelCards = await readJsonFile("./mock/modelCards.json");

    const usersAuthenticated = await Promise.all(
      entities.map(async (entity: any) => {
        const { password, ...rest } = entity;
        const passwordHash = await bcrypt.hash(password, 10);
        return { ...rest, passwordHash };
      })
    );

    await Entity.deleteMany();
    const createdEntities = await Entity.create(usersAuthenticated);

    const modelCardsWithEntity = modelCards.map((mc: any) => ({
      ...mc,
      entity: createdEntities[mc.entity]._id,
    }));

    await ModelCard.deleteMany();
    await ModelCard.create(modelCardsWithEntity);
  } catch (err) {
    console.error(err);
  } finally {
    disconnectDatabase();
  }
})();
