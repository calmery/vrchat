import * as url from "url";
import { VRChatAPIBaseUrl } from "./types";
import {
  VRCHAT_API_BASE_URL,
  VRCHAT_API_BASE_URL_DEVELOPMENT,
  VRCHAT_API_BASE_URL_BETA
} from "./constants";

export interface UrlBuilder {
  config: () => string;
}

const generateUrlBuilder = (baseUrl: VRChatAPIBaseUrl): UrlBuilder => {
  return {
    config() {
      return url.resolve(baseUrl, "config");
    }
  };
};

export const urlBuilder = generateUrlBuilder(VRCHAT_API_BASE_URL);
export const urlBuilderUsingDevelopmentUrl = generateUrlBuilder(
  VRCHAT_API_BASE_URL_DEVELOPMENT
);
export const urlBuilderUsingBetaUrl = generateUrlBuilder(
  VRCHAT_API_BASE_URL_BETA
);
