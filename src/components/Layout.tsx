import { ReactNode } from "react";
import Nav from "./Nav";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/helper/apiHelper";
import { User } from "@directus/types";
import { useRouter } from "next/router";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { pathname } = router;

  const { data, error, isLoading, isFetching, isFetched, isSuccess } = useQuery(
    {
      queryKey: ["currentUser"],
      queryFn: () => fetcher<{ data: User }>("users/me"),
    }
  );

  const hideNavRoutes = ["/auth/signin", "/auth/register", "/404"];

  const shouldHideNav = hideNavRoutes.includes(pathname);

  if (isFetched && isSuccess) {
    return (
      <>
        {!shouldHideNav && (
          <nav>
            <Nav info={data} />
          </nav>
        )}
        <main className="container mx-auto max-w-5xl p-5 px-6">{children}</main>
      </>
    );
  }
};

export default Layout;
