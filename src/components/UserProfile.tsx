import { fetcher } from "@/helper/apiHelper";
import { User } from "@directus/types";
import { useQuery } from "@tanstack/react-query";
import LogoutButton from "./Buttons/LogoutButton";
import { Image } from "@nextui-org/image";

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
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="grid place-items-center gap-2">
        <Image
          className="transition-transform cursor-pointer w-48 h-48 object-cover"
          src={
            user?.data.avatar
              ? `${api}/assets/${user.data.avatar}`
              : `https://avatar.iran.liara.run/public/boy?username=${user?.data.first_name}`
          } // Set a default avatar path
          alt={`${user?.data.first_name}'s avatar`}
          width={192}
          height={192}
        />
        <p className="font-bold text-3xl">{user?.data.first_name}</p>
        <p className="text-xl">{user?.data.email}</p>
        <LogoutButton />
      </div>
    </>
  );
};

export default UserProfile;
