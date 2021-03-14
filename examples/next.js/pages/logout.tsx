import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth";
import styles from "../styles/Logout.module.css";

export default function Logout() {
  const [auth, setAuth] = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (auth.state !== "authenticated") {
      router.back();
      return;
    }

    (async () => {
      const response = await fetch("/api/logout", {
        headers: {
          Authorization: `Token ${auth.auth}`
        },
        method: "PUT",
      })

      console.log(response)

      switch (response.status) {
        case 200:
          setAuth({ state: "unauthenticated" });
          break;

        case 400:
          setError("Authentication Failed");
          break;

        case 500:
          setError("Internal Server Error");
          break;

        default:
          setError("Unknown Error");
      }
    })();
  }, [auth]);

  if (error) {
    return <div className={styles.error}>{error}</div>
  }

  return null;
}
