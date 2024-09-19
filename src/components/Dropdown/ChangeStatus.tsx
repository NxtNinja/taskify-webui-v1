import { Chip } from "@nextui-org/chip";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { patcher } from "@/helper/apiHelper";
import { TaskType } from "@/utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const ChangeStatus = ({ task }: { task: { data: TaskType } }) => {
  const [status, setStatus] = useState(task.data.status);

  const queryClient = useQueryClient();

  const updateTaskStatus = async (key: string) => {
    await patcher(`items/task/${task.data.id}`, {
      status: key,
    });
    queryClient.invalidateQueries({ queryKey: ["task", task.data.id] });
    console.log(key);
  };

  const statusOptions = [
    { key: "todo", label: "Todo" },
    { key: "in-progress", label: "In progress" },
    { key: "completed", label: "Completed" },
  ].filter((option) => option.key !== status);
  return (
    <>
      <div className="relative">
        <Dropdown>
          <DropdownTrigger>
            <Chip
              className="cursor-pointer"
              variant="dot"
              color={
                status === "todo"
                  ? "warning"
                  : status === "in-progress"
                  ? "primary"
                  : "success"
              }
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}{" "}
              {/* Capitalize first letter */}
            </Chip>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Select task status"
            onAction={(key) => updateTaskStatus(key as string)}
          >
            {statusOptions.map((option) => (
              <DropdownItem key={option.key}>
                <Chip
                  variant="dot"
                  color={
                    option.key === "todo"
                      ? "warning"
                      : option.key === "in-progress"
                      ? "primary"
                      : "success"
                  }
                  className="border-none"
                >
                  {option.label}
                </Chip>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
};

export default ChangeStatus;
