import { logout } from "@/helper/authApi";
import { Button } from "@nextui-org/button";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";

const LogoutButton = () => {
  const router = useRouter();
  const [load, setLoad] = useState(false);

  const logout_user = async () => {
    setLoad(true);
    await logout();
    router.push("/auth/signin");
    setLoad(false);
  };
  return (
    <>
      <Button
        isLoading={load}
        color="danger"
        startContent={<LogOutIcon />}
        className="w-[200px]"
        size="lg"
        radius="sm"
        onPress={logout_user}
      >
        Logout
      </Button>
    </>
  );
};

export default LogoutButton;
