import { useState } from "react";
import { TaskType } from "@/utils/types";
import DisplaySubTasks from "./SubTasks/DisplaySubTasks";
import { Edit, Trash } from "lucide-react";
import { Chip } from "@nextui-org/chip";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { patcher } from "@/helper/apiHelper";
import { useQueryClient } from "@tanstack/react-query";
import ChangeStatus from "../Dropdown/ChangeStatus";
import { useDisclosure } from "@nextui-org/modal";
import UpdateTaskModal from "../modal/UpdateTaskModal";
import EditTaskButton from "../Buttons/EditTaskButton";
import DeleteTaskButton from "../Buttons/DeleteTaskButton";

const TaskDetails = ({ task }: { task: { data: TaskType } }) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  };

  const date_created = new Date(task.data.date_created);
  const deadline = new Date(task.data.end_date);

  const formattedDateCreated = new Intl.DateTimeFormat("en-US", options).format(
    date_created
  );
  const formattedDeadline = new Intl.DateTimeFormat("en-US", options).format(
    deadline
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="">
          <p className="lg:text-3xl md:text-xl text-sm font-bold">
            {formattedDateCreated}
          </p>
          <p className="text-sm">Start date</p>
        </div>
        <p className="lg:text-5xl md:text-xl text-sm">&gt;</p>
        <div className="">
          <p className="lg:text-3xl md:text-xl text-sm font-bold">
            {formattedDeadline}
          </p>
          <p className="text-sm">End date</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="sm:flex gap-3 items-center">
            <p className="lg:text-4xl md:text-2xl text-lg font-bold max-w-xl">
              {task.data.heading}
            </p>

            <ChangeStatus task={task} />
          </div>

          <div className="flex items-center gap-2">
            <EditTaskButton task={task} />
            <DeleteTaskButton id={task.data.id} />
          </div>
        </div>

        <div className="">
          <p className="lg:text-lg md:text-base text-xs">Description</p>
          <p className="lg:text-xl md:text-lg text-sm font-bold max-w-xl">
            {task.data.description}
          </p>
        </div>

        <div className="space-y-3">
          <p className="">Sub Tasks</p>
          <DisplaySubTasks subTasks={task.data.sub_task} />
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
