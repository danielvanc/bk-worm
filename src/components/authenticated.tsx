import React from 'react'
import { useAuth } from 'context/auth'

export default function Authenticated() {
  const { session } = useAuth()

  return (
    <div>
      <h1>Authenticated!</h1>
      <button onClick={() => session.signOut()}>Sign out</button>
    </div>
  )
}
