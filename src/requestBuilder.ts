import { VRCHAT_API_BASE_URL } from "./constants";
import axios, { AxiosInstance } from "axios";

export const generateRequestURL = (endpoint: string) => {
  return `${VRCHAT_API_BASE_URL}${endpoint}`;
};

export const login = (apiKey: string, username: string, password: string) => {
  const url = generateRequestURL("auth/user");

  return axios.get(url, {
    params: { apiKey },
    auth: { username, password }
  });
};

export const logout = (axiosInstance: AxiosInstance) => {
  const url = generateRequestURL("logout");

  return axiosInstance.put(url);
};

export const config = () => {
  const url = generateRequestURL("config");

  return axios.get(url);
};
