import mongoose, { Document, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface IModelCard extends Document {
  name: string;
  description: string;
  coverImage: string;
  entity: mongoose.Types.ObjectId;
  content?: mongoose.Types.ObjectId;
  isPrivate: boolean;
  odrl?: string;
  isOdrlUpdate?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const modelCardSchema: Schema<IModelCard> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    coverImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1542903660-eedba2cda473?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGF0YXxlbnwwfHwwfHx8MA%3D%3D.png",
    },
    entity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entity",
    },
    content: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ModelCardContent",
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    odrl: {
      type: String,
      trim: true,
    },
    isOdrlUpdate: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

modelCardSchema.plugin(uniqueValidator);

const ModelCard = mongoose.model<IModelCard>("ModelCard", modelCardSchema);

export default ModelCard;
