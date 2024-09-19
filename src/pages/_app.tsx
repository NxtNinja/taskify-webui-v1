import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
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
    <QueryClientProvider client={queryClient}>
      <main className={poppins.className}>
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
        <Toaster />
      </main>
    </QueryClientProvider>
  );
}
