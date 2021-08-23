import React from 'react'
import { useAuth } from 'context/auth'

export default function Unauthenticated() {
  const { session } = useAuth();
  return (
    <div>
      <h1>You are unauthenticated!</h1>
      
      <button onClick={() => session.signIn()}>Sign in</button>
    </div>
  )
}
