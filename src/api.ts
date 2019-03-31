import axios, { AxiosResponse, AxiosInstance } from "axios";
import { VRChatConfig } from "./types";
import * as requestBuilder from "./requestBuilder";
import { VRCHAT_API_BASE_URL } from "./constants";

const generateAxiosInstanceByCookie = (cookie: string[]) => {
  return axios.create({
    baseURL: VRCHAT_API_BASE_URL,
    headers: {
      Cookie: cookie
    }
  });
};

export const getConfig = async (): Promise<VRChatConfig | null> => {
  try {
    const response: AxiosResponse<VRChatConfig> = await requestBuilder.config();

    return response.data;
  } catch {
    return null;
  }
};

export const login = async (
  apiKey: string,
  username: string,
  password: string
): Promise<AxiosInstance | null> => {
  try {
    const { headers } = await requestBuilder.login(apiKey, username, password);

    if (!headers.hasOwnProperty("set-cookie")) {
      return null;
    }

    return generateAxiosInstanceByCookie(headers["set-cookie"]);
  } catch {
    // If the status code is 401, API key may be invalid.
    return null;
  }
};

export const logout = async (axiosInstance: AxiosInstance) => {
  try {
    await requestBuilder.logout(axiosInstance);

    return true;
  } catch {
    return false;
  }
};
