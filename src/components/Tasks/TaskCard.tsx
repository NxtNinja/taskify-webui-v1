import { TaskType } from "@/utils/types";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import Link from "next/link";
import { Chip } from "@nextui-org/chip";
import { Delete, Edit } from "lucide-react";
import EditTaskButton from "../Buttons/EditTaskButton";
import DeleteTaskButton from "../Buttons/DeleteTaskButton";

const TaskCard = ({ task }: { task: TaskType }) => {
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

  return (
    <>
      <Card className="w-full h-full">
        <CardHeader className="flex items-start flex-col">
          {task.status !== "todo" ? (
            task.status !== "completed" ? (
              // in progress
              <p className="text-primary">{task.status}</p>
            ) : (
              //compltee
              <p className="text-green-500">{task.status}</p>
            )
          ) : (
            //todo
            <p className="text-orange-500">{task.status}</p>
          )}

          <div className="space-y-5">
            <p className="font-bold text-lg">{task.heading}</p>
            <div className="space-y-2">
              <p className="">
                {" "}
                Date created:{" "}
                <span className="font-bold">{formattedDateCreated}</span>
              </p>
              <p className="">
                {" "}
                Deadline:{" "}
                <span className="font-bold">
                  {task.end_date !== null ? formattedDeadline : "No deadline"}
                </span>
              </p>
            </div>
          </div>
        </CardHeader>
        {/* <CardBody>{task.description}</CardBody> */}
        <CardFooter className="space-x-4">
          <EditTaskButton task={task} />
          <DeleteTaskButton id={task.id} />
        </CardFooter>
      </Card>
    </>
  );
};

export default TaskCard;
