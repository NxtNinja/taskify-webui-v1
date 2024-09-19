import { fetcher } from "@/helper/apiHelper";
import { User } from "@directus/types";
import { useQuery } from "@tanstack/react-query";
import { Image } from "@nextui-org/image";
import LogoutButton from "./Buttons/LogoutButton";
import { Avatar } from "@nextui-org/avatar";

const UserProfile = () => {
  const api = process.env.NEXT_PUBLIC_API;
  const {
    data: user,
    error,
    isLoading,
    isFetching,
    isFetched,
    isSuccess,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => fetcher<{ data: User }>("users/me"),
  });

  return (
    <>
      <div className="grid place-items-center gap-2">
        <Avatar
          isBordered
          className="transition-transform cursor-pointer w-48 h-48"
          color="primary"
          size="sm"
          src={`${api}/assets/${user?.data.avatar}`}
          showFallback
        />
        <p className="font-bold text-3xl">{user?.data.first_name}</p>
        <p className="text-xl">{user?.data.email}</p>
        <LogoutButton />
      </div>
    </>
  );
};

export default UserProfile;
