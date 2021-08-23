import * as React from 'react'
import AuthProvider from 'context/auth'

export default function AppProviders({ children }) {
  return (
    <AuthProvider>
    { children }
    </AuthProvider>
  )
}