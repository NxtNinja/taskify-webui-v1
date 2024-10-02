import { TaskType } from "@/utils/types";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Delete, Edit } from "lucide-react";
import EditTaskButton from "../Buttons/EditTaskButton";
import DeleteTaskButton from "../Buttons/DeleteTaskButton";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown"; // Import NextUI components
import { useQueryClient } from "@tanstack/react-query";
import { patcher } from "@/helper/apiHelper";

const TaskCard = ({ task }: { task: TaskType }) => {
  const queryClient = useQueryClient();
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  };

  const date_created = new Date(task.date_created);
  const deadline = new Date(task.end_date);

  // Format both dates using UTC time zone
  const formattedDateCreated = new Intl.DateTimeFormat("en-US", options).format(
    date_created
  );
  const formattedDeadline = new Intl.DateTimeFormat("en-US", options).format(
    deadline
  );

  // Function to handle status change
  const handleStatusChange = async (newStatus: string) => {
    try {
      await patcher(`items/task/${task.id}`, {
        status: newStatus,
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex items-start flex-col">
        <Dropdown>
          <DropdownTrigger>
            {task.status !== "todo" ? (
              task.status !== "completed" ? (
                // in progress
                <Chip
                  color="primary"
                  variant="dot"
                  className="cursor-pointer border-none"
                >
                  {task.status}
                </Chip>
              ) : (
                // completed
                <Chip
                  color="success"
                  variant="dot"
                  className="cursor-pointer border-none"
                >
                  {task.status}
                </Chip>
              )
            ) : (
              // todo
              <Chip
                color="warning"
                variant="dot"
                className="cursor-pointer border-none"
              >
                {task.status}
              </Chip>
            )}
          </DropdownTrigger>
          {task.status === "todo" && (
            <DropdownMenu>
              <DropdownItem onClick={() => handleStatusChange("in-progress")}>
                <Chip
                  variant="dot"
                  className="cursor-pointer border-none"
                  color="primary"
                >
                  In-progress
                </Chip>
              </DropdownItem>
              <DropdownItem onClick={() => handleStatusChange("completed")}>
                <Chip
                  variant="dot"
                  className="cursor-pointer border-none"
                  color="success"
                >
                  Completed
                </Chip>
              </DropdownItem>
            </DropdownMenu>
          )}
          {task.status === "in-progress" && (
            <DropdownMenu>
              <DropdownItem onClick={() => handleStatusChange("completed")}>
                <Chip
                  variant="dot"
                  className="cursor-pointer border-none"
                  color="success"
                >
                  Completed
                </Chip>
              </DropdownItem>
              <DropdownItem onClick={() => handleStatusChange("todo")}>
                <Chip
                  variant="dot"
                  className="cursor-pointer border-none"
                  color="warning"
                >
                  Todo
                </Chip>
              </DropdownItem>
            </DropdownMenu>
          )}
          {task.status === "completed" && (
            <DropdownMenu>
              <DropdownItem onClick={() => handleStatusChange("in-progress")}>
                <Chip
                  variant="dot"
                  className="cursor-pointer border-none"
                  color="primary"
                >
                  In-progress
                </Chip>
              </DropdownItem>
              <DropdownItem onClick={() => handleStatusChange("todo")}>
                <Chip
                  variant="dot"
                  className="cursor-pointer border-none"
                  color="warning"
                >
                  Todo
                </Chip>
              </DropdownItem>
            </DropdownMenu>
          )}
        </Dropdown>

        <div className="space-y-5">
          <p className="font-bold text-lg">{task.heading}</p>
          <div className="space-y-2">
            <p>
              Date created:{" "}
              <span className="font-bold">{formattedDateCreated}</span>
            </p>
            <p>
              Deadline:{" "}
              <span className="font-bold">
                {task.end_date !== null ? formattedDeadline : "No deadline"}
              </span>
            </p>
          </div>
        </div>
      </CardHeader>

      <CardFooter className="flex justify-between">
        <div className="space-x-4">
          <EditTaskButton task={task} />
          <DeleteTaskButton id={task.id} />
        </div>

        {/* Dropdown for changing task status */}
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
