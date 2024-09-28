import Signin from "@/components/Signin";
import Head from "next/head";

const signin = () => {
  return (
    <>
      <Head>
        <title>Sign in</title>
        <meta
          name="description"
          content="Welcome to my Taskify | Manage your tasks easily"
        />
        <meta name="author" content="Priyangsu Banik" />
        <meta
          name="keywords"
          content="Tasks, Taskify, Directus, Next.js, React, TypeScript, Tailwind, Directus, Next.js, React, TypeScript, Tailwind"
        />
      </Head>
      <Signin />
    </>
  );
};

export default signin;
