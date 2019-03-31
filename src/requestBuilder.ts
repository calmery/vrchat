import { resolve } from "url";
import { VRCHAT_API_BASE_URL } from "./constants";
import axios from "axios";

const generateRequestURL = (endpoint: string) => {
  return resolve(VRCHAT_API_BASE_URL, endpoint);
};

export const config = () => {
  const url = generateRequestURL("config");

  return axios.get(url);
};
