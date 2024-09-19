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

const Nav = ({ info }: { info: { data: User } }) => {
  const api = process.env.NEXT_PUBLIC_API;
  return (
    <>
      <Navbar>
        <NavbarBrand as={Link} href={"/"}>
          <p className="font-bold text-inherit">TASKIFY</p>
        </NavbarBrand>

        <NavbarContent as={Link} href={"/profile"} justify="end">
          <Avatar
            isBordered
            className="transition-transform cursor-pointer"
            color="primary"
            size="sm"
            src={`${api}/assets/${info.data.avatar}`}
            showFallback
          />
          <p className="">{info.data.first_name}</p>
        </NavbarContent>
      </Navbar>
    </>
  );
};

export default Nav;
