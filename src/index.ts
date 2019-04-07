import { AxiosInstance } from "axios";
import { login, logout, requests } from "./api";
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
    return requests.get(this.axiosInstance, endpoint, params);
  }

  post(
    endpoint: string,
    params?: { [key: string]: string | number | boolean }
  ) {
    return requests.post(this.axiosInstance, endpoint, params);
  }

  put(endpoint: string, params?: { [key: string]: string | number | boolean }) {
    return requests.put(this.axiosInstance, endpoint, params);
  }

  delete(
    endpoint: string,
    params?: { [key: string]: string | number | boolean }
  ) {
    return requests.delete(this.axiosInstance, endpoint, params);
  }
}
