import axios from "axios";
import { SERVICE_MODEL_CARD_BASE_URL } from "../constants";

const BASE_URL = SERVICE_MODEL_CARD_BASE_URL;

export const getAllPublicModelCards = async (): Promise<any> => {
  const res = await axios.get(BASE_URL, { withCredentials: true });
  return res.data;
};

export const createModelCard = async (data: any): Promise<any> => {
  const res = await axios.post(BASE_URL, data, { withCredentials: true });
  return res.data;
};

export const createModelCardOdrl = async (modelCardId: string, data: any) => {
  const res = await axios.put(
    `${BASE_URL}/${modelCardId}/odrl`,
    { data: JSON.stringify(data, null, 2) },
    {
      withCredentials: true,
    }
  );
  return res.data;
};
