import { AppProps } from "next/app";
import React from "react";
import { Router } from "../components/Router";
import { AuthContextProvider } from "../contexts/auth";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Router>
        <Component {...pageProps} />
      </Router>
    </AuthContextProvider>
  );
}

export default MyApp;
