import { Skeleton } from "@nextui-org/skeleton";
import TaskCardSkeleton from "./TaskCardSkeleton";

const DisplayTasksSkeleton = () => {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center w-full">
        <Skeleton className="h-10 w-40 rounded-sm" />
        <Skeleton className="h-10 w-40 rounded-sm" />
      </div>
      <div className="flex justify-between items-center w-full">
        <Skeleton className="h-10 w-40 rounded-sm" />
        <Skeleton className="h-10 w-40 rounded-sm" />
      </div>
      <div className="">
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
      <div className="grid place-items-center mt-10 gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <TaskCardSkeleton />
        <TaskCardSkeleton />
        <TaskCardSkeleton />
        <TaskCardSkeleton />
        <TaskCardSkeleton />
        <TaskCardSkeleton />
      </div>
      <div className="flex justify-center">
        <Skeleton className="h-8 w-40 rounded-sm mt-6" />
      </div>
    </div>
  );
};

export default DisplayTasksSkeleton;
