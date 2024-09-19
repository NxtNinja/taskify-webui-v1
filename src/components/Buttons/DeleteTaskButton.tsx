import { useDisclosure } from "@nextui-org/modal";
import { Trash } from "lucide-react";
import DeleteModal from "../modal/DeleteModal";

const DeleteTaskButton = ({ id }: { id: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Trash className="text-red-500" size={25} onClick={onOpen} />
      <DeleteModal id={id} isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default DeleteTaskButton;
