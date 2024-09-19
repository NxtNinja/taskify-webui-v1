import Link from "next/link";

const Custom404 = () => {
  return (
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
  );
};

export default Custom404;
