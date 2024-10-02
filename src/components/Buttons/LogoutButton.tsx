import { useLogout } from "@/hooks/useAuth";
import { Button } from "@nextui-org/button";
import { useQueryClient } from "@tanstack/react-query";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";

const LogoutButton = () => {
  const router = useRouter();
  const { mutate: logout, isPending } = useLogout();

  const queryClient = useQueryClient();

  const logout_user = async () => {
    logout();
    queryClient.removeQueries();
  };
  return (
    <>
      <Button
        isLoading={isPending}
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
