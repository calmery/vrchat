import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth";
import styles from "../styles/Home.module.css";
import { UsernameResponse } from "../types/api";

export default function Index() {
  const [auth] = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (auth.state === "authenticated") {
      setError(null);

      (async () => {
        const response = await fetch("/api/username", {
          headers: {
            Authorization: `Token ${auth.auth}`,
          },
        });

        switch (response.status) {
          case 200: {
            const { data }: UsernameResponse = await response.json();
            setUsername(data.username);
            break;
          }

          case 401:
            setError("Unauthenticated Error");
            break;

          default:
            setError("Unknown Error");
        }
      })();
    }
  }, [auth]);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!username) {
    return null;
  }

  return (
    <>
      <div>Hello, {username}.</div>
      <Link href="logout">Logout</Link>
    </>
  );
}
