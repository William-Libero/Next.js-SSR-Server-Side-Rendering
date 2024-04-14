import "../styles/globals.css";
import { Providers } from "../provider/provider";
import Head from "next/head";

export default function app({ Component, pageProps }) {
  return (
    <Providers>
      <Head>
        <title>Next.js - News blog - SSR (Server Side Rendering)</title>
        <meta
          name="description"
          content="Next.js - News blog - SSR (Server Side Rendering)"
        />
        <link rel="icon" href="/images/code.png" />
      </Head>
      <Component {...pageProps} />
    </Providers>
  );
}
