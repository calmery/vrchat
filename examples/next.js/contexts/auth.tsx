import React, { createContext, useState } from "react";
import { VRChatTFAMethod } from "vrchat";

export type AuthContextState =
  | {
      state: "unauthenticated";
    }
  | {
      auth: string;
      methods: VRChatTFAMethod[];
      state: "verify";
    }
  | {
      auth: string;
      state: "authenticated";
    };

export const AuthContext = createContext(
  ([] as unknown) as [
    AuthContextState,
    React.Dispatch<React.SetStateAction<AuthContextState>>
  ]
);

export const AuthContextProvider: React.FC = ({ children }) => {
  return (
    <AuthContext.Provider
      value={useState<AuthContextState>({
        state: "unauthenticated",
      })}
    >
      {children}
    </AuthContext.Provider>
  );
};
