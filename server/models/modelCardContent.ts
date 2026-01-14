import mongoose, { Document, Schema } from "mongoose";

interface IModelCardContent extends Document {
  modelDetails: {
    provider?: string;
    version?: string;
    type?: string;
    architecture?: string;
    description?: string;
    license?: string;
  };
  intendedUse: {
    primaryIntendedUser?: string;
    primaryIntendedDomain?: string;
    primaryIntendedUseCases?: string;
    secondaryIntendedUser?: string;
    secondaryIntendedDomain?: string;
    secondaryIntendedUseCases?: string;
  };
  factors: {
    hardware?: string;
    software?: string;
  };
  evaluation: {
    metrics?: string;
    factors?: string;
    datasets?: string;
    performance?: string;
  };
  trainingData: {
    algorithm?: string;
    dataset?: string;
    procedure?: string;
  };
  ethicalConsiderations: {
    typeOfBias?: string;
    biasMitigation?: string;
    privacyConcerns?: string;
    privacyPolicy?: string;
    safetyMeasures?: string;
    securityMeasures?: string;
    safetyAndSecurityPolicy?: string;
    riskFactors?: string;
    riskSeverity?: string;
    riskMitigation?: string;
    unintendedUsers?: string;
    prohibitedDomains?: string;
    misuseCases?: string;
    regulatoryAdherence?: string;
    regulatoryCompliance?: string;

    limitations?: string;
  };
  caveatsAndRecommendations?: string;
  richFields?: [{ field: string; type: "image" | "json"; content: string }];
}

const modelCardContentSchema: Schema<IModelCardContent> = new mongoose.Schema({
  modelDetails: {
    provider: { type: String },
    version: { type: String },
    type: { type: String },
    architecture: { type: String },
    description: { type: String },
    license: { type: String },
  },

  intendedUse: {
    primaryIntendedUsers: { type: String },
    primaryIntendedDomain: { type: String },
    primaryIntendedUseCases: { type: String },
    secondaryIntendedUsers: { type: String },
    secondaryIntendedDomain: { type: String },
    secondaryIntendedUseCases: { type: String },
  },

  factors: {
    hardware: { type: String },
    software: { type: String },
  },

  evaluation: {
    metrics: { type: String },
    factors: { type: String },
    datasets: { type: String },
    performance: { type: String },
  },

  trainingData: {
    algorithm: { type: String },
    dataset: { type: String },
    procedure: { type: String },
  },

  ethicalConsiderations: {
    typeOfBias: { type: String },
    biasMitigation: { type: String },
    privacyConcerns: { type: String },
    privacyPolicy: { type: String },
    safetyMeasures: { type: String },
    securityMeasures: { type: String },
    safetyAndSecurityPolicy: { type: String },
    riskFactors: { type: String },
    riskSeverity: { type: String },
    riskMitigation: { type: String },
    unintendedUsers: { type: String },
    prohibitedDomains: { type: String },
    misuseCases: { type: String },
    regulatoryAdherence: { type: String },
    regulatoryCompliance: { type: String },
    limitations: { type: String },
  },

  caveatsAndRecommendations: { type: String },
  richFields: [
    {
      field: { type: String },
      type: { type: String, enum: ["image", "json"] },
      content: { type: String },
    },
  ],
});

const ModelCardContent = mongoose.model<IModelCardContent>(
  "ModelCardContent",
  modelCardContentSchema
);

export default ModelCardContent;
