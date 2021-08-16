import React from 'react'
import { signUp } from 'next-auth-sanity/';
import { signIn } from 'next-auth/client';

export default function Unauthenticated() {
  return (
    <div>
      <h1>You are unauthenticated!</h1>
      
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  )
}
