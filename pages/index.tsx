import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../src/components";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Jina CODE ESI BACKEND</title>
      </Head>
      <Header title="Jina CODE ESI BACKEND" />
      <div className="min-h-[400px]"></div>
    </div>
  );
};

export default Home;
