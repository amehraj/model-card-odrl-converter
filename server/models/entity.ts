import mongoose, { Document, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface IEntity extends Document {
  name: string;
  email: string;
  passwordHash: string;
  accountType: "Entity" | "personal";
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
}

const entitySchema: Schema<IEntity> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: ["organization", "personal"],
      default: "personal",
    },
    profilePicture: {
      type: String,
      trim: true,
      match:
        /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
    },
  },
  { timestamps: true }
);

entitySchema.plugin(uniqueValidator);
entitySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.passwordHash;
  },
});

const Entity = mongoose.model<IEntity>("Entity", entitySchema);

export default Entity;
