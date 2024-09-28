import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import Head from "next/head";
import { Toaster } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 5,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </>
  );
}
