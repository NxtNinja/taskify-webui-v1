import { useDisclosure } from "@nextui-org/modal";
import { Trash } from "lucide-react";
import DeleteModal from "../modal/DeleteModal";
import { Button } from "@nextui-org/button";

const DeleteTaskButton = ({ id }: { id: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Button isIconOnly color="danger" variant="faded">
      <Trash
        className="text-red-500 cursor-pointer"
        size={30}
        onClick={onOpen}
      />
      <DeleteModal id={id} isOpen={isOpen} onOpenChange={onOpenChange} />
    </Button>
  );
};

export default DeleteTaskButton;
