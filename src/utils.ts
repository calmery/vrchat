import axios, { AxiosError } from "axios";
import * as cookie from "cookie";

export const createAxios = (auth?: string) => {
  return axios.create({
    baseURL: "https://vrchat.com/api/1/auth/",
    headers: auth ? { cookie: cookie.serialize("auth", auth) } : undefined,
    params: {
      apiKey: "JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26",
    },
  });
};

export const getAuth = (headers: {
  "set-cookie": string[] | undefined;
}): string | undefined => {
  // Reference: https://github.com/axios/axios/blob/62d625603916115691bcea2842c5d6e331279b99/lib/helpers/parseHeaders.js#L45
  const cookies: string[] = headers["set-cookie"] || [];

  const { auth } = cookies.reduce(
    (previous, current) => ({
      ...previous,
      ...cookie.parse(current),
    }),
    {}
  ) as { auth?: string };

  return auth;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAxiosError = (error: any): error is AxiosError => {
  return !!error.isAxiosError;
};

export const validateTfaCode = (regExp: RegExp, code: string) => {
  const matched = code.match(regExp);

  if (!matched || matched[0] !== code) {
    return false;
  }

  return true;
};
