import { AxiosInstance } from "axios";
import { login, logout } from "./api";
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
      return true;
    }

    const axiosInstance = await login(this.apiKey, username, password);

    if (axiosInstance === null) {
      return false;
    }

    this.axiosInstance = axiosInstance;

    return true;
  }

  async logout() {
    if (this.axiosInstance === null) {
      return true;
    }

    const logoutResult = await logout(this.axiosInstance);

    if (!logoutResult) {
      return false;
    }

    this.axiosInstance = null;

    return true;
  }

  getAxiosInstance() {
    return this.axiosInstance;
  }
}
