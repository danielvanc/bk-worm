import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useAuth } from 'context/auth'

const Loading = () => <p>Loading...</p>

const AuthenticatedApp = dynamic(
  () => import('./authenticated'),
  { loading: Loading }
);

const UnAuthenticatedApp = dynamic(
  () => import('./unauthenticated'),
  { loading: Loading }
);

export default function Page({ children }) {
  const { session } = useAuth()
  return (
    <div>

      <Head>
        <title>BK Worm</title>
        <meta name="description" content="The book app for book lovers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!session?.user && (
        <UnAuthenticatedApp />
      )}
      
      {session?.user && (
        <AuthenticatedApp>
          {children}
        </AuthenticatedApp>
      )}      
      
    </div>
  )
}
