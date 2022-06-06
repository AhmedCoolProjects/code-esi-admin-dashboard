import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import ApolloCustomClient from "../apollo/ApolloClient";
import { Layout } from "../src/components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* favicon.ico */}
        <link rel="icon" href="/favicon.ico" />
        {/* apple-touch-icon.png */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
      </Head>
      <ApolloProvider client={ApolloCustomClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
