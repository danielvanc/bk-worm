import * as React from "react";
import AuthProvider from "context/auth";
import { AppProvidersProps } from "types";

export default function AppProviders({ children }: AppProvidersProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
