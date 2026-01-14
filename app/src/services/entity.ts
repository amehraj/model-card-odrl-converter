import axios from "axios";
import { SERVICE_ENTITY_BASE_URL } from "../constants";

const BASE_URL = SERVICE_ENTITY_BASE_URL;

export const register = async (data: any): Promise<any> => {
  console.log(data);
  const res = await axios.post(`${BASE_URL}/register`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const login = async (data: any): Promise<any> => {
  const res = await axios.post(`${BASE_URL}/login`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const logout = async () => {
  await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
};

export const getCurrentEntity = async (): Promise<any> => {
  const res = await axios.get(`${BASE_URL}/current`, { withCredentials: true });
  return res.data;
};

export const getAllEntities = async (): Promise<any> => {
  const res = await axios.get(BASE_URL, { withCredentials: true });
  return res.data;
};

export const getUserById = async (id: string): Promise<any> => {
  const res = await axios.get(`${BASE_URL}/${id}`, {
    withCredentials: true,
  });
  return res.data;
};
