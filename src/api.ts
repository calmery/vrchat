import axios, { AxiosResponse } from "axios";
import { VRChatConfig } from "./types";
import { UrlBuilder } from "./urlBuilder";

export const getVRChatConfig = async (
  urlBuilder: UrlBuilder
): Promise<VRChatConfig | null> => {
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
