import { useDisclosure } from "@nextui-org/modal";
import { PenLine } from "lucide-react";
import UpdateUsernameModal from "../Modal/UpdateUsernameModal";

const UpdateUsername = ({ username }: { username: string | null }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <PenLine className="text-yellow-500 cursor-pointer" onClick={onOpen} />
      <UpdateUsernameModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        username={username}
      />
    </>
  );
};

export default UpdateUsername;
