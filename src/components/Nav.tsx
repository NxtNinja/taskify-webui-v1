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
import { userQuery } from "@/utils/tkQueries";
import { SunMedium } from "lucide-react";
import SwitchTheme from "./SwitchTheme";

const Nav = () => {
  const api = process.env.NEXT_PUBLIC_API;
  const {
    data: info,
    error,
    isLoading,
    isFetching,
    isFetched,
    isSuccess,
  } = userQuery();
  if (isSuccess && isFetched) {
    return (
      <>
        <Navbar>
          <NavbarBrand as={Link} href={"/"} className="space-x-3">
            <p className="font-bold text-inherit text-3xl">TASKIFY</p>
          </NavbarBrand>

          <NavbarContent justify="center" className=""></NavbarContent>
          <NavbarContent justify="end">
            <SwitchTheme />

            <Link href={"/profile"} className="flex items-center gap-2">
              <Image
                className="cursor-pointer w-10 h-10 rounded-full object-cover"
                src={
                  info.data.avatar
                    ? `${api}/assets/${info.data.avatar}`
                    : `https://avatar.iran.liara.run/public/boy?username=${info?.data.first_name}`
                } // Default avatar
                alt={`${info.data.first_name}'s avatar`}
                radius="full"
              />
              <p className="">{info.data.first_name}</p>
            </Link>
          </NavbarContent>
        </Navbar>
      </>
    );
  }
};

export default Nav;
