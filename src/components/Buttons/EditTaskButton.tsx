import { Edit } from "lucide-react";
import UpdateTaskModal from "../modal/UpdateTaskModal";
import { useDisclosure } from "@nextui-org/modal";
import { TaskType } from "@/utils/types";

const EditTaskButton = ({ task }: { task: { data: TaskType } }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Edit className="text-yellow-500" size={25} onClick={onOpen} />
      <UpdateTaskModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        task={task}
      />
    </div>
  );
};

export default EditTaskButton;
