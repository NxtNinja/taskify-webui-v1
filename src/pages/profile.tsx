import UserProfile from "@/components/UserProfile";
import Head from "next/head";

const profile = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
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
      <UserProfile />
    </>
  );
};

export default profile;
