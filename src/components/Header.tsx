import { useRouter } from "next/router";
import Nav from "./Nav";
import { fetcher } from "@/helper/apiHelper";
import { User } from "@directus/types";
import { useQuery } from "@tanstack/react-query";

const Header = () => {
  const pathname = useRouter().pathname;
  const hideNavRoutes = ["/auth/signin", "/auth/register", "/404"];

  const shouldHideNav = hideNavRoutes.includes(pathname);
  return (
    <>
      {!shouldHideNav && (
        <nav>
          <Nav />
        </nav>
      )}
    </>
  );
};

export default Header;
