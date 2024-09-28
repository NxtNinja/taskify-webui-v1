import { ReactNode } from "react";
import Nav from "./Nav";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/helper/apiHelper";
import { User } from "@directus/types";
import { useRouter } from "next/router";
import Header from "./Header";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "300",
});

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <>
      <div className={poppins.className}>
        <Header />
        <main className="container mx-auto max-w-5xl p-5 px-6">{children}</main>
      </div>
    </>
  );
};

export default Layout;
