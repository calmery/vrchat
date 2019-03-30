import axios, { AxiosResponse } from "axios";
import { VRChatConfig } from "./types";
import urlBuilder from "./urlBuilder";

export const getConfig = async (): Promise<VRChatConfig | null> => {
  try {
    const url = urlBuilder.config();
    const response: AxiosResponse<VRChatConfig> = await axios.get(url);

    if (response.status !== 200) {
      return null;
    }

    return response.data;
  } catch {
    return null;
  }
};
