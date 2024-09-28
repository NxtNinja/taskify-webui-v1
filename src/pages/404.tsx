import Head from "next/head";
import Link from "next/link";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404</title>
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
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4 text-center">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link href="/">
          <p className="text-blue-500 hover:underline">Go back to Home</p>
        </Link>
      </div>
    </>
  );
};

export default Custom404;
