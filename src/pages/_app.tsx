import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { signIn, signOut, Provider, useSession } from 'next-auth/client';




function App({ Component, pageProps }: AppProps) {
  // Load user info here
  // const [session, loading] = useSession();
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
  
}
export default App
