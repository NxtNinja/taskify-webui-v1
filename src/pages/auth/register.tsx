import Register from "@/components/Register";
import Head from "next/head";

const register = () => {
  return (
    <>
      <Head>
        <title>Register | Taskify</title>
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
      <Register />
    </>
  );
};

export default register;
