import { ReactNode, useEffect } from "react";
import Header from "./Header";
import { Poppins } from "next/font/google";
import { useAtom } from "jotai/react";
import { themeAtom } from "@/utils/themeAtom";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "300",
});

const Layout = ({ children }: { children: ReactNode }) => {
  const [theme] = useAtom(themeAtom);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

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
