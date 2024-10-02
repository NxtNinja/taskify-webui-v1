import { PenLine } from "lucide-react";
import UpdateTaskModal from "../Modal/UpdateTaskModal";
import { useDisclosure } from "@nextui-org/modal";
import { TaskType } from "@/utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Button } from "@nextui-org/button";

const EditTaskButton = ({ task }: { task: TaskType }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleupdateTask = async () => {
    onOpen();
  };

  return (
    <Button isIconOnly color="warning" variant="faded">
      <PenLine
        className="text-yellow-500 cursor-pointer"
        size={30}
        onClick={handleupdateTask}
      />
      <UpdateTaskModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        task={task}
      />
    </Button>
  );
};

export default EditTaskButton;
