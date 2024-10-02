import { useFilePicker } from "use-file-picker";
import { Camera, PenLine } from "lucide-react";
import { Image } from "@nextui-org/image";
import { Skeleton } from "@nextui-org/skeleton";
import { userQuery } from "@/utils/tkQueries";
import LogoutButton from "./Buttons/LogoutButton";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { patcher, poster } from "@/helper/apiHelper";
import ky from "ky";
import { File } from "@directus/types";
import { useQueryClient } from "@tanstack/react-query";
import UpdateUsername from "./Buttons/UpdateUsernameButton";

const UserProfile = () => {
  const api = process.env.NEXT_PUBLIC_API;
  const queryClient = useQueryClient();

  const { openFilePicker, filesContent, clear } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    onFilesSuccessfullySelected: async ({ plainFiles }) => {
      const formData = new FormData();
      formData.append("file", plainFiles[0]);

      console.log(plainFiles[0]);

      try {
        const fileData = await ky
          .post(`files`, {
            prefixUrl: api,

            body: formData,
            credentials: "include",
          })
          .json<{ data: File }>();

        console.log(fileData);

        await patcher(`users/${fileData.data.uploaded_by}`, {
          avatar: fileData.data.id,
        });

        clear();
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const {
    data: user,
    isLoading,
    isFetching,
    isFetched,
    isSuccess,
  } = userQuery();

  if (isLoading || isFetching) {
    return (
      <div className="space-y-5 flex flex-col items-center">
        <div className="flex justify-between items-center w-full">
          <Skeleton className="h-10 w-40 rounded-sm" />
          <Skeleton className="h-10 w-40 rounded-sm" />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <Skeleton className="w-48 h-48 rounded-full" />
          <Skeleton className="w-48 h-8" />
          <Skeleton className="w-64 h-6" />
          <Skeleton className="w-32 h-12 rounded" />
        </div>
      </div>
    );
  }

  if (isFetched && isSuccess) {
    return (
      <div className="grid place-items-center gap-4">
        <div className="relative group w-48 h-48">
          {filesContent.length !== 0 ? (
            filesContent.map((file, index) => (
              <div key={index}>
                <Image
                  onClick={() => openFilePicker()}
                  className="transition-transform w-48 h-48 object-cover rounded-full"
                  src={file.content}
                  alt={`${user?.data.first_name}'s avatar`}
                  width={192}
                  height={192}
                  radius="full"
                />
              </div>
            ))
          ) : (
            <Image
              className="transition-transform w-48 h-48 object-cover rounded-full"
              src={
                user.data.avatar
                  ? `${api}/assets/${user.data.avatar}`
                  : `https://avatar.iran.liara.run/public/boy?username=${user?.data.first_name}`
              }
              alt={`${user?.data.first_name}'s avatar`}
              width={192}
              height={192}
              radius="full"
            />
          )}

          <div
            onClick={() => openFilePicker()}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-50 cursor-pointer"
          >
            <Camera className="text-white text-3xl" />
          </div>
        </div>

        <div className="space-y-2 flex justify-center items-center flex-col">
          <div className="flex items-center gap-2">
            <p className="font-bold text-3xl">{user.data.first_name}</p>
            <UpdateUsername username={user.data.first_name} />
          </div>
          <p className="text-xl">{user?.data.email}</p>
          <LogoutButton />
        </div>
      </div>
    );
  }
};

export default UserProfile;
