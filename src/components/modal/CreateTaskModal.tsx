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
import { poster } from "@/helper/apiHelper";
import { useQueryClient } from "@tanstack/react-query";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "300",
});

interface ModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function CreateTaskModal({ isOpen, onOpenChange }: ModalProps) {
  const [heading, setHeading] = useState("");
  const [endDate, setEndDate] = useState(now(getLocalTimeZone()));
  const [load, setLoad] = useState(false);

  const queryClient = useQueryClient();

  const handleCreateTask = async () => {
    if (heading === "") {
      return;
    }
    try {
      setLoad(true);
      await poster("items/task", {
        heading,
        end_date: endDate.toString(),
      });
      queryClient.refetchQueries({ queryKey: ["tasks"] });
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
                  Create task
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
