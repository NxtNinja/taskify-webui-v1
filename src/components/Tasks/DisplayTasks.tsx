import { keepPreviousData, useQuery } from "@tanstack/react-query";
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
import DisplayTasksSkeleton from "../Skeleton/DisplayTasksSkeleton";
import { taskQuery } from "@/utils/tkQueries";

const DisplayTasks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: tasks,
    isFetched,
    isLoading,
    isFetching,
    isSuccess,
  } = taskQuery(6, currentPage);

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

  useEffect(() => {
    // If there are no tasks on the current page and we're not on the first page, go back to the first page
    if (tasks?.data.length === 0 && currentPage > 1) {
      setCurrentPage(1);
    }
  }, [tasks, currentPage]);

  if (isLoading || isFetching) {
    return <DisplayTasksSkeleton />;
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
            <div className="grid place-items-center gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {filteredTasks.map((item) => {
                return <TaskCard key={item.id} task={item} />;
              })}
            </div>
            <div className="flex justify-center mt-4">
              <PaginationComponent
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={Math.ceil(tasks.meta.total_count / 6)} // Dynamically calculate total pages
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
