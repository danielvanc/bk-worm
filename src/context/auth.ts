import * as React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client';

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext"

export default function AuthProvider(props) {
  const [session, loading] = useSession();

  const value = {
    session: {
      ...session,
      signIn,
      signOut
    }
  }

// TODO: Add extra possible states

  // If success
  return (
    <AuthContext.Provider value= { value } {...props } />
  )
}


// Using this so that we have access to everything the user has
// saved. Including the session token the user is authenticated with
    
export function useAuth() {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context
}