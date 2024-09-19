import { Skeleton } from "@nextui-org/skeleton";
import TaskCardSkeleton from "./TaskCardSkeleton";

const DisplayTasksSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center w-full">
        {/* Skeleton for the title */}
        <Skeleton className="h-8 w-40" />

        {/* Skeleton for the button */}
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Skeleton for the task cards */}
      <div className="grid place-items-center gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <TaskCardSkeleton key={index} />
        ))}
      </div>

      {/* Skeleton for pagination */}
      <div className="flex justify-center mt-4">
        <Skeleton className="h-8 w-40" />
      </div>
    </div>
  );
};

export default DisplayTasksSkeleton;
