import { useQuery } from "@tanstack/react-query";
import PaginationComponent from "./PaginationComponent";
import TaskCard from "./TaskCard";
import { fetcher } from "@/helper/apiHelper";
import { TaskType } from "@/utils/types";
import { PartyPopper } from "lucide-react";
import { useState, useEffect } from "react";
import { Skeleton } from "@nextui-org/skeleton";
import TaskCardSkeleton from "../Skeleton/TaskCardSkeleton";
import AddTaskButton from "../Buttons/AddTaskButton";
import { Input } from "@nextui-org/input";

const DisplayTasks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 6;

  const {
    data: tasks,
    isFetched,
    isLoading,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ["tasks", currentPage],
    queryFn: () =>
      fetcher<{ meta: { total_count: number }; data: TaskType[] }>(
        `items/task?limit=${limit}&page=${currentPage}&meta=total_count&sort=-date_created`
      ),
  });

  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    if (tasks && tasks.data) {
      if (searchQuery.trim() === "") {
        setFilteredTasks(tasks.data);
      } else {
        const filtered = tasks.data.filter((task) =>
          task.heading.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredTasks(filtered);
      }
    }
  }, [searchQuery, tasks]);

  if (isLoading || isFetching) {
    return (
      <div className="space-y-5">
        <div className="flex justify-between items-center w-full">
          <Skeleton className="h-8 w-40 rounded-sm" />
          <Skeleton className="h-10 w-32 rounded-sm" />
        </div>
        <div className="grid place-items-center gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <TaskCardSkeleton />
          <TaskCardSkeleton />
          <TaskCardSkeleton />
          <TaskCardSkeleton />
          <TaskCardSkeleton />
          <TaskCardSkeleton />
        </div>
      </div>
    );
  }

  if (isFetched && isSuccess) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold">Latest Tasks</p>
          <AddTaskButton />
        </div>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            color="primary"
            variant="faded"
            radius="sm"
            size="lg"
          />
        </div>
        {filteredTasks.length !== 0 ? (
          <>
            <div className="grid place-items-center gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {filteredTasks.map((item) => {
                return <TaskCard key={item.id} task={item} />;
              })}
            </div>
            <div className="">
              <PaginationComponent
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={Math.ceil(tasks.meta.total_count / limit)} // Dynamically calculate total pages
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-10">
            <PartyPopper />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No tasks to show!
            </h2>
            <p className="text-lg text-gray-500 mb-4 text-center">
              It looks like you haven't added any tasks yet. Start by creating a
              new one.
            </p>
          </div>
        )}
      </div>
    );
  }

  if (tasks?.data === null) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-10">
        <PartyPopper />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          No tasks to show!
        </h2>
        <p className="text-lg text-gray-500 mb-4 text-center">
          It looks like you haven't added any tasks yet. Start by creating a new
          one.
        </p>
      </div>
    );
  }
};

export default DisplayTasks;
