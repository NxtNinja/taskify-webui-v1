import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";
import { User } from "@directus/types";
import { Image } from "@nextui-org/image";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/helper/apiHelper";

const Nav = () => {
  const api = process.env.NEXT_PUBLIC_API;
  const {
    data: info,
    error,
    isLoading,
    isFetching,
    isFetched,
    isSuccess,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => fetcher<{ data: User }>("users/me"),
    refetchOnWindowFocus: false,
  });
  if (isSuccess && isFetched) {
    return (
      <>
        <Navbar>
          <NavbarBrand as={Link} href={"/"}>
            <p className="font-bold text-inherit text-3xl">TASKIFY</p>
          </NavbarBrand>

          <NavbarContent as={Link} href={"/profile"} justify="end">
            <Image
              className="transition-transform cursor-pointer"
              src={
                info.data.avatar
                  ? `${api}/assets/${info.data.avatar}`
                  : `https://avatar.iran.liara.run/public/boy?username=${info?.data.first_name}`
              } // Default avatar
              alt={`${info.data.first_name}'s avatar`}
              width={40} // Adjust size as needed
              height={40} // Adjust size as needed
            />
            <p className="">{info.data.first_name}</p>
          </NavbarContent>
        </Navbar>
      </>
    );
  }
};

export default Nav;
