import { ChangeEvent, useCallback, useContext, useState } from "react";
import { AuthContext } from "../contexts/auth";
import styles from "../styles/Login.module.css";
import { LoginPayload, LoginResponse } from "../types/api";

export default function Login() {
  const [auth, setAuth] = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // Events

  const handleChangePassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPassword(event.currentTarget.value);
    },
    []
  );

  const handleChangeUsername = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUsername(event.currentTarget.value);
    },
    []
  );

  const handleClickLoginButton = useCallback(async () => {
    if (!password || !username) {
      return;
    }

    setError(null);
    setIsFetching(true);

    const payload: LoginPayload = {
      username,
      password,
    };

    const response = await fetch("/api/login", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    switch (response.status) {
      case 200: {
        const { data }: LoginResponse = await response.json();
        const { auth, tfa } = data;

        if (tfa) {
          setAuth({
            auth,
            state: "verify",
            methods: tfa,
          });
        } else {
          setAuth({
            auth,
            state: "authenticated",
          });
        }

        break;
      }

      case 400:
        setError("Authentication Failed");
        break;

      case 500:
        setError("Internal Server Error");
        break;

      default:
        setError("Unknown Error");
    }

    setIsFetching(false);
  }, [password, username]);

  // Render

  if (auth.state !== "unauthenticated") {
    return null;
  }

  return (
    <>
      {error && <div className={styles.error}>{error}</div>}
      <div>
        <label>Username</label>
        <input
          defaultValue={username}
          onChange={handleChangeUsername}
          type="text"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          defaultValue={password}
          onChange={handleChangePassword}
          type="password"
        />
      </div>
      <button
        disabled={isFetching || !username || !password}
        onClick={handleClickLoginButton}
      >
        Login
      </button>
    </>
  );
}
