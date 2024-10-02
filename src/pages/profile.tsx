import UserProfile from "@/components/UserProfile";
import Head from "next/head";

const profile = () => {
  return (
    <>
      <Head>
        <title>Profile | Taskify</title>
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
      <div className="px-6 p-5">
        <UserProfile />
      </div>
    </>
  );
};

export default profile;
