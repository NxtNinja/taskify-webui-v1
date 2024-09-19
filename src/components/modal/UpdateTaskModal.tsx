import { useState } from "react";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { now, getLocalTimeZone, parseDate } from "@internationalized/date";
import { DatePicker } from "@nextui-org/date-picker";
import { Button } from "@nextui-org/button";
import { Poppins } from "next/font/google";
import { patcher, poster } from "@/helper/apiHelper";
import { useQueryClient } from "@tanstack/react-query";
import { TaskType } from "@/utils/types";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "300",
});

interface ModalProps {
  task: { data: TaskType };
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function UpdateTaskModal({
  isOpen,
  onOpenChange,
  task,
}: ModalProps) {
  const [heading, setHeading] = useState(task.data.heading);
  const [description, setDescription] = useState(task.data.description);
  const [endDate, setEndDate] = useState(now(getLocalTimeZone()));
  const [load, setLoad] = useState(false);

  const queryClient = useQueryClient();

  const handleCreateTask = async () => {
    try {
      setLoad(true);
      await patcher(`items/task/${task.data.id}`, {
        heading,
        description,
        end_date: endDate.toString(),
      });
      queryClient.refetchQueries({ queryKey: ["task", task.data.id] });
      setLoad(false);
      onOpenChange();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
                Add new task
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
                  onPress={handleCreateTask}
                >
                  Update task
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
