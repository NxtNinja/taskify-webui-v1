import { deleter } from "@/helper/apiHelper";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { useRouter } from "next/router";
import { useState } from "react";

interface ModalProps {
  id: string;
  isOpen: boolean;
  onOpenChange: () => void;
}

const DeleteModal = ({ id, isOpen, onOpenChange }: ModalProps) => {
  const [load, setLoad] = useState(false);
  const { push } = useRouter();
  const deleteTask = async () => {
    setLoad(true);
    await deleter(`items/task/${id}`);
    setLoad(false);
    push("/");
  };
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure to delete this task?
              </ModalHeader>
              <ModalBody>
                <p>
                  This can not be undone. Click on delete to delete this task
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  isLoading={load}
                  color="danger"
                  variant="solid"
                  radius="sm"
                  onPress={deleteTask}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
