import type { AppProps } from "next/app";
// import dynamic from "next/dynamic";
import AppProviders from "context";
import "tailwindcss/tailwind.css";
import { SessionProvider } from "next-auth/react";

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppProviders>
        <Component {...pageProps} />
      </AppProviders>
    </SessionProvider>
  );
}
export default App;
