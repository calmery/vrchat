import { VRChatTFAMethod } from "./types";
import { createAxios, getAuth, isAxiosError, validateTfaCode } from "./utils";

// Errors

export class VRChatAuthenticationError extends Error {}

export class VRChatUnauthenticatedError extends Error {
  message = "Unauthenticated";
}

// Functions

export const isTfaMethod = (
  maybeVRChatTFAMethod: string
): maybeVRChatTFAMethod is VRChatTFAMethod => {
  return ([
    VRChatTFAMethod.OneTimePassword,
    VRChatTFAMethod.TimeBasedOneTimePassword,
  ] as string[]).includes(maybeVRChatTFAMethod);
};

export const login = async (username: string, password: string) => {
  try {
    const { data, headers } = await createAxios().get<{
      requiresTwoFactorAuth?: VRChatTFAMethod[];
    }>("user", {
      auth: { username, password },
    });

    const auth = getAuth(headers);

    if (!auth) {
      throw new VRChatAuthenticationError("Auth cookie not found");
    }

    return {
      auth,
      tfa: data.requiresTwoFactorAuth || undefined,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      throw new VRChatAuthenticationError("Invalid Username or Password");
    }

    throw error;
  }
};

export const logout = async (auth: string) => {
  await put(auth, "logout");
};

export const verifyTfa = async (
  auth: string,
  method: VRChatTFAMethod,
  code: string
) => {
  if (
    (method === VRChatTFAMethod.OneTimePassword &&
      !validateTfaCode(/[\d|\w]{4}-[\d|\w]{4}/, code)) ||
    (method === VRChatTFAMethod.OneTimePassword &&
      !validateTfaCode(/\d{6}/, code))
  ) {
    throw new VRChatAuthenticationError("Input format is not correct");
  }

  try {
    await post(auth, `twofactorauth/${method}/verify`, { code });
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 400) {
      throw new VRChatAuthenticationError("That code didn't work");
    }

    throw error;
  }
};

// CRUD

export const delete_ = async <T extends Record<string, unknown>>(
  auth: string,
  pathname: string,
  payload?: Record<string, unknown>
) => {
  try {
    const { data } = await createAxios(auth).delete<T>(pathname, {
      data: payload,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      throw new VRChatUnauthenticatedError();
    }

    throw error;
  }
};

export const get = async <T extends Record<string, unknown>>(
  auth: string,
  pathname: string,
  payload?: Record<string, unknown>
) => {
  try {
    const { data } = await createAxios(auth).get<T>(pathname, {
      params: payload,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      throw new VRChatUnauthenticatedError();
    }

    throw error;
  }
};

export const post = async <T extends Record<string, unknown>>(
  auth: string,
  pathname: string,
  payload?: Record<string, unknown>
) => {
  try {
    const { data } = await createAxios(auth).post<T>(pathname, payload);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      throw new VRChatUnauthenticatedError();
    }

    throw error;
  }
};

export const put = async <T extends Record<string, unknown>>(
  auth: string,
  pathname: string,
  payload?: Record<string, unknown>
) => {
  try {
    const { data } = await createAxios(auth).put<T>(pathname, payload);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      throw new VRChatUnauthenticatedError();
    }

    throw error;
  }
};

// Class

export class VRChat {
  private _auth: string | null = null;

  async login(username: string, password: string) {
    if (this.auth) {
      throw new VRChatAuthenticationError("You are already logged in");
    }

    const { auth, tfa } = await login(username, password);
    this.auth = auth;

    return tfa;
  }

  async logout() {
    if (!this.auth) {
      throw new VRChatUnauthenticatedError();
    }

    await logout(this.auth);

    this.auth = null;
  }

  async verifyTfa(method: VRChatTFAMethod, code: string) {
    if (!this.auth) {
      throw new VRChatUnauthenticatedError();
    }

    await verifyTfa(this.auth, method, code);
  }

  //

  delete(
    pathname: Parameters<typeof delete_>[1],
    payload: Parameters<typeof delete_>[2]
  ) {
    if (!this.auth) {
      throw new VRChatUnauthenticatedError();
    }

    return delete_(this.auth, pathname, payload);
  }

  get(pathname: Parameters<typeof get>[1], payload: Parameters<typeof get>[2]) {
    if (!this.auth) {
      throw new VRChatUnauthenticatedError();
    }

    return get(this.auth, pathname, payload);
  }

  post(
    pathname: Parameters<typeof post>[1],
    payload: Parameters<typeof post>[2]
  ) {
    if (!this.auth) {
      throw new VRChatUnauthenticatedError();
    }

    return post(this.auth, pathname, payload);
  }

  put(pathname: Parameters<typeof put>[1], payload: Parameters<typeof put>[2]) {
    if (!this.auth) {
      throw new VRChatUnauthenticatedError();
    }

    return put(this.auth, pathname, payload);
  }

  //

  get auth() {
    return this._auth;
  }

  set auth(auth: string | null) {
    this._auth = auth;
  }

  static from(auth: string) {
    const vrchat = new VRChat();

    vrchat.auth = auth;

    return vrchat;
  }
}
