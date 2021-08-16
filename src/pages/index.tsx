import Head from 'next/head'
import React from 'react';
import dynamic from 'next/dynamic'
import { signIn, signOut, Provider, useSession } from 'next-auth/client';
import prisma from '../../lib/prisma';

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
  const [session, loading] = useSession()
  return (
    <div> 
      <Head>
        <title>BK Worm</title>
        <meta name="description" content="The book app for book lovers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!session && (
        <UnAuthenticatedApp />
      )}
      
      {session && (
        <AuthenticatedApp />
      )}
      
    </div>
  )
}

export async function getStaticProps() {
  const Users = await prisma.user.findMany()

  return { props: { Users } }
}