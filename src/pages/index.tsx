import Head from 'next/head'
import React from 'react';
import dynamic from 'next/dynamic'
import { useAuth } from 'context/auth'

const Loading = () => <p>Loading...</p>

const AuthenticatedApp = dynamic(
  () => import('../components/authenticated'),
  { loading: Loading }
);

const UnAuthenticatedApp = dynamic(
  () => import('../components/unauthenticated'),
  { loading: Loading }
);

export default function Home() {
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
        <AuthenticatedApp />
      )}
      
    </div>
  )
}

// export async function getStaticProps() {
//   return { props: {} }
// }