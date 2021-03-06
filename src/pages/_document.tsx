import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />

          <link
            crossOrigin="true"
            href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Montserrat:wght@600&family=Source+Serif+Pro:wght@400;700&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body className="font-serifPro">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
