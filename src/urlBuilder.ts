import * as url from "url";
import { VRCHAT_API_BASE_URL } from "./constants";

export default {
  config() {
    return url.resolve(VRCHAT_API_BASE_URL, "config");
  }
};
