import { Skeleton } from "@nextui-org/skeleton";

const TaskDetailsSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="">
          <Skeleton className="lg:h-8 lg:w-40 md:h-6 md:w-32 h-4 w-24 rounded-sm" />
          <Skeleton className="h-4 w-20 mt-1 rounded-sm" />
        </div>
        <p className="lg:h-10 lg:w-10 md:h-6 md:w-6 h-4 w-4">&gt;</p>
        <div className="">
          <Skeleton className="lg:h-8 lg:w-40 md:h-6 md:w-32 h-4 w-24 rounded-sm" />
          <Skeleton className="h-4 w-20 mt-1 rounded-sm" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="lg:h-10 lg:w-80 md:h-8 md:w-64 h-6 w-48 rounded-sm" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
        </div>
        <div className="">
          <Skeleton className="h-4 w-24 mb-2 rounded-sm" />
          <Skeleton className="lg:h-6 lg:w-80 md:h-5 md:w-64 h-4 w-48 rounded-sm" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-24 mb-1 rounded-sm" />
          <Skeleton className="lg:h-6 lg:w-80 md:h-5 md:w-64 h-4 w-48 rounded-sm" />
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsSkeleton;
