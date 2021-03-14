import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth";

export const Router: React.FC = ({ children }) => {
  const [{ state }] = useContext(AuthContext);
  const { push } = useRouter();

  console.log(state)

  useEffect(() => {
    switch (state) {
      case "authenticated":
        push("/");
        return;

      case "unauthenticated":
        push("/login");
        return;

      case "verify":
        push("/login/verify");
        return;
    }
  }, [state]);

  return <>{children}</>;
};
