import axios from "axios";
import {
  SERVICE_MODEL_CARD_CONTENT_BASE_URL,
  SERVICE_MODEL_CARD_PDF,
} from "../constants";

const BASE_URL = SERVICE_MODEL_CARD_CONTENT_BASE_URL;

export const createModelCardContent = async (
  modelCardId: string,
  data: any
): Promise<any> => {
  const res = await axios.post(
    `${BASE_URL}/model-card/${modelCardId}`,
    JSON.parse(data),
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const uploadPdfFile = async (modelCardId: string, data: any) => {
  console.log(`${SERVICE_MODEL_CARD_PDF}/${modelCardId}`);

  const res = await axios.post(
    `${SERVICE_MODEL_CARD_PDF}/${modelCardId}`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return res.data;
};
