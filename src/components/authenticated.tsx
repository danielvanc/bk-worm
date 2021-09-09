import React from "react";
import { useAuth } from "context/auth";
import { AuthenticatedProps } from "types";

export default function Authenticated({ children }: AuthenticatedProps) {
  const { session } = useAuth();

  return (
    <div>
      <h1>Authenticated!</h1>
      <button onClick={() => session.signOut()}>Sign out</button>

      {children}
    </div>
  );
}
