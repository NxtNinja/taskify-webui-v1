import { TaskType } from "@/utils/types";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import Link from "next/link";
import { Chip } from "@nextui-org/chip";

const TaskCard = ({ task }: { task: TaskType }) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC", // Ensure it's formatted in UTC
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
      <Card
        as={Link}
        href={`/task/${task.id}`}
        className="w-full cursor-pointer hover:scale-105 transition-all h-full"
      >
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
        <CardFooter>
          {task.sub_task.length !== 0
            ? `${task.sub_task.length} sub tasks`
            : "No sub tasks"}
        </CardFooter>
      </Card>
    </>
  );
};

export default TaskCard;
