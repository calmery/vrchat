import { AxiosResponse } from "axios";
import { VRChatConfig } from "./types";
import * as requestBuilder from "./requestBuilder";

export const getConfig = async (): Promise<VRChatConfig | null> => {
  try {
    const response: AxiosResponse<VRChatConfig> = await requestBuilder.config();

    return response.data;
  } catch {
    return null;
  }
};
