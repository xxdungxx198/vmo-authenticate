import Head from "next/head";
import React, { FC, ReactElement } from "react";
import Link from "next/link";

interface PropsIndex {
  children: ReactElement;
}

const Index: FC<PropsIndex> = () => {
  return (
    <div className="h-screen flex justify-center items-center text-center">
      <Head>
        <title>VMO project</title>
      </Head>
      <div>
        <h1>Hello</h1>
        <Link href="/login">
          <button className="bg-black rounded px-3 text-white text-3xl">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
