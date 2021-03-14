import { VRChatTFAMethod } from "vrchat";

export type Payload<T extends Record<string, any>> = Partial<T> | undefined;

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  data: {
    auth: string;
    tfa?: VRChatTFAMethod[];
  };
};

export type LoginVerifyPayload = {
  code: string;
  method: VRChatTFAMethod;
};

export type UsernameResponse = {
  data: {
    username: string;
  };
};
