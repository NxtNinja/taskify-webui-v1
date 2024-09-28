import { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { now, getLocalTimeZone } from "@internationalized/date";
import { DatePicker } from "@nextui-org/date-picker";
import { Button } from "@nextui-org/button";
import { Poppins } from "next/font/google";
import { patcher } from "@/helper/apiHelper";
import { useQueryClient } from "@tanstack/react-query";
import { TaskType } from "@/utils/types";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "300",
});

interface ModalProps {
  task: TaskType;
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function UpdateTaskModal({
  isOpen,
  onOpenChange,
  task,
}: ModalProps) {
  const [heading, setHeading] = useState(task.heading);
  const [description, setDescription] = useState(task.description);
  const [endDate, setEndDate] = useState(now(getLocalTimeZone()));
  const [load, setLoad] = useState(false);

  const queryClient = useQueryClient();

  // Update state when the modal opens and the task prop changes
  useEffect(() => {
    if (isOpen) {
      setHeading(task.heading);
      setDescription(task.description);
      setEndDate(now(getLocalTimeZone())); // Set the end date if needed, or use task's end date if available
    }
  }, [isOpen, task]);

  const handleUpdateTask = async () => {
    try {
      setLoad(true);
      await patcher(`items/task/${task.id}`, {
        heading,
        description,
        end_date: endDate.toString(),
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setLoad(false);
      onOpenChange(); // Close the modal after updating
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      className={poppins.className}
      radius="sm"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Update task
            </ModalHeader>
            <ModalBody>
              <Input
                placeholder="Enter a heading"
                type="text"
                size="lg"
                radius="sm"
                variant="faded"
                color="primary"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
              />

              <Input
                placeholder="Enter description"
                type="text"
                size="lg"
                radius="sm"
                variant="faded"
                color="primary"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="w-full max-w-xl flex flex-row gap-4">
                <DatePicker
                  label="Enter end date"
                  variant="faded"
                  hideTimeZone
                  showMonthAndYearPickers
                  defaultValue={endDate}
                  onChange={setEndDate}
                  color="primary"
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                isLoading={load}
                color="primary"
                radius="sm"
                onPress={handleUpdateTask}
              >
                Update task
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
