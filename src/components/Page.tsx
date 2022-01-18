import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { supabase } from "utils/supabase";
import Unauthenticated from "./unauthenticated";
// import { useAuth } from "context/auth";

type PageProps = {
  title?: string;
  desc?: string;
  children?: ReactNode;
};

const Loading = () => <p>Loading...</p>;

const AuthenticatedApp = dynamic(() => import("./authenticated"), {
  loading: Loading,
});

const UnAuthenticatedApp = dynamic(() => import("./unauthenticated"), {
  loading: Loading,
});

export default function Page({
  title = "BK Worm",
  desc = "The book app for book lovers",
  children,
}: PageProps) {
  // const { session } = useAuth();

  const Router = useRouter();
  // TODO: Set correct types
  const [user, setUser] = useState<any>();

  async function handleLogout() {
    await supabase.auth.signOut();
    Router.push("/");
  }

  async function handleLogIn() {
    await supabase.auth.signIn({
      provider: "github",
    });
  }

  useEffect(() => {
    console.log({ user });
  }, [user]);

  useEffect(() => {
    const session = supabase.auth.session();

    setUser(session ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!user && <button onClick={handleLogIn}>Log in</button>}
      {user && <button onClick={handleLogout}>Log out</button>}

      <Unauthenticated />
      {/* {!session?.user && <UnAuthenticatedApp />} */}
      {/* {session?.user && <AuthenticatedApp>{children}</AuthenticatedApp>} */}
    </div>
  );
}
