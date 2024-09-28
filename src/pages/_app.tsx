import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import Head from "next/head";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "300",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Taskify</title>
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
      <QueryClientProvider client={queryClient}>
        <main className={poppins.className}>
          <Layout>
            <NextUIProvider>
              <Component {...pageProps} />
            </NextUIProvider>
            <Toaster
              toastOptions={{
                classNames: {
                  toast: "bg-transparent",
                  title: "text-blue-400",
                  description: "text-red-400",
                  actionButton: "bg-blue-600",
                  cancelButton: "bg-orange-400",
                  closeButton: "bg-lime-400",
                },
              }}
            />
          </Layout>
        </main>
      </QueryClientProvider>
    </>
  );
}
