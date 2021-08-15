import React from 'react'
import { signIn, signOut, Provider, useSession } from 'next-auth/client';

export default function Authenticated() {
  // const [session, loading] = useSession();
  return (
    <div>
      <h1>Authenticated!</h1>

      {/* Signed in as {session.user.email} <br/> */}
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
}
