import React, { ChangeEvent, useCallback, useContext, useState } from "react";
import { VRChatTFAMethod } from "../../../../build";
import { AuthContext } from "../../contexts/auth";
import styles from "../../styles/LoginVerify.module.css";
import { LoginVerifyPayload } from "../../types/api";

export default function LoginVerify() {
  const [auth, setAuth] = useContext(AuthContext);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [method, setMethod] = useState(
    VRChatTFAMethod.TimeBasedOneTimePassword
  );

  // Events

  const handleChangeCode = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setCode(event.currentTarget.value);
    },
    []
  );

  const handleChangeMethod = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setMethod(event.currentTarget.value as VRChatTFAMethod);
    },
    []
  );

  const handleClickVerifyButton = useCallback(async () => {
    if (!code || auth.state !== "verify") {
      return;
    }

    setIsProcessing(true);

    const payload: LoginVerifyPayload = {
      code,
      method,
    };

    const { status } = await fetch("/api/login/verify", {
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Token ${auth.auth}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    switch (status) {
      case 200:
        setAuth({
          ...auth,
          state: "authenticated",
        });

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

    setIsProcessing(false);
  }, [code, method]);

  // Render

  if (auth.state !== "verify") {
    return null;
  }

  return (
    <>
      {error && <div className={styles.error}>{error}</div>}
      <div>
        <label>Methods</label>
        {auth.methods.map((m) => (
          <React.Fragment key={m}>
            <input
              defaultChecked={method === m}
              name="method"
              onChange={handleChangeMethod}
              type="radio"
              value={m}
            />
            {method}
          </React.Fragment>
        ))}
      </div>
      <div>
        <label>Code</label>
        <input defaultValue={code} onChange={handleChangeCode} type="text" />
      </div>
      <button
        disabled={isProcessing || !code}
        onClick={handleClickVerifyButton}
      >
        Verify
      </button>
    </>
  );
}
