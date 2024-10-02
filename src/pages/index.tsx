import DisplayTasks from "@/components/Tasks/DisplayTasks";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Taskify | Home</title>
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
        <DisplayTasks />
      </div>
    </>
  );
}
