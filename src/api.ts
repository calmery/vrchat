import axios, { AxiosResponse, AxiosInstance } from "axios";
import cookie from "cookie";
import { VRChatConfig } from "./types";
import * as requestBuilder from "./requestBuilder";
import { VRCHAT_API_BASE_URL } from "./constants";

const generateAxiosInstanceByCookie = (cookies: string[]) => {
  const { auth, apiKey } = cookies
    .map(string => cookie.parse(string))
    .reduce((xs, ys) => ({ ...xs, ...ys }));

  if (auth === undefined || apiKey === undefined) {
    throw new Error("Cookie (auth or apiKey) does not exist");
  }

  return axios.create({
    baseURL: VRCHAT_API_BASE_URL,
    headers: {
      Cookie: [
        cookie.serialize("apiKey", apiKey),
        cookie.serialize("auth", auth)
      ]
    }
  });
};

const getConfig = async (): Promise<VRChatConfig | null> => {
  try {
    const response: AxiosResponse<VRChatConfig> = await requestBuilder.config();

    return response.data;
  } catch {
    return null;
  }
};

export const getAPIKey = async (): Promise<string | null> => {
  const config = await getConfig();

  if (config === null) {
    return null;
  }

  return config.apiKey;
};

export const login = async (
  apiKey: string,
  username: string,
  password: string
): Promise<AxiosInstance> => {
  // If the status code is 401, API key may be invalid or authentication may have failed.
  const { headers } = await requestBuilder.login(apiKey, username, password);

  if (headers["set-cookie"] === undefined) {
    throw new Error("Cookie does not exist");
  }

  return generateAxiosInstanceByCookie(headers["set-cookie"]);
};

export const logout = requestBuilder.logout;
