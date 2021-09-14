import type { AppProps } from "next/app";
// import dynamic from "next/dynamic";
import AppProviders from "context";
import "tailwindcss/tailwind.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <AppProviders>
      <Component {...pageProps} />
    </AppProviders>
  );
}
export default App;
