import { AxiosInstance } from "axios";
import { login, logout } from "./api";
import { generateRequestURL } from "./requestBuilder";
export { getAPIKey } from "./api";

export class VRChat {
  private apiKey = "JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26"; // As of March 31, 2019.
  private axiosInstance: AxiosInstance | null = null;

  constructor(apiKey?: string) {
    if (apiKey !== undefined) {
      this.apiKey = apiKey;
    }
  }

  async login(username: string, password: string) {
    if (this.axiosInstance !== null) {
      return;
    }

    this.axiosInstance = await login(this.apiKey, username, password);
  }

  async logout() {
    if (this.axiosInstance === null) {
      return;
    }

    await logout(this.axiosInstance);

    this.axiosInstance = null;
  }

  get(endpoint: string, params?: { [key: string]: string | number | boolean }) {
    if (this.axiosInstance === null) {
      throw new Error("Authentication required");
    }

    return this.axiosInstance.get(generateRequestURL(endpoint), { params });
  }

  post(endpoint: string, data?: { [key: string]: string | number | boolean }) {
    if (this.axiosInstance === null) {
      throw new Error("Authentication required");
    }

    return this.axiosInstance.post(generateRequestURL(endpoint), data);
  }

  put(endpoint: string, data?: { [key: string]: string | number | boolean }) {
    if (this.axiosInstance === null) {
      throw new Error("Authentication required");
    }

    return this.axiosInstance.put(generateRequestURL(endpoint), data);
  }

  delete(
    endpoint: string,
    data?: { [key: string]: string | number | boolean }
  ) {
    if (this.axiosInstance === null) {
      throw new Error("Authentication required");
    }

    return this.axiosInstance.delete(generateRequestURL(endpoint), { data });
  }
}
