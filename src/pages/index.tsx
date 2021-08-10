import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>BK Worm</title>
        <meta name="description" content="The book app for book lovers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-center text-lg">BK Worm</h1>
      </main>
    </div>
  )
}
