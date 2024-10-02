import { Button } from "@nextui-org/button";
import { Plus } from "lucide-react";
import CreateTaskModal from "../Modal/CreateTaskModal";
import { useDisclosure } from "@nextui-org/modal";

const AddTaskButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        startContent={<Plus />}
        radius="sm"
        size="md"
        color="primary"
      >
        Add task
      </Button>
      <CreateTaskModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default AddTaskButton;
