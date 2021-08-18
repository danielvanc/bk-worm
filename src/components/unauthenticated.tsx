import React from 'react'
import { signIn, useSession } from 'next-auth/client';

export default function Unauthenticated() {
  return (
    <div>
      <h1>You are unauthenticated!</h1>
      
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  )
}
