import { ReactNode } from "react";
import AuthProvider from "context/auth";

type AppProvidersProps = {
  children?: ReactNode;
};

export default function AppProviders({ children }: AppProvidersProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
