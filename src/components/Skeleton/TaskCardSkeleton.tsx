import { Card, CardHeader, CardFooter } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

const TaskCardSkeleton = () => {
  return (
    <Card className="w-full cursor-pointer hover:scale-105 transition-all h-full">
      <CardHeader className="flex items-start flex-col">
        {/* Skeleton for status */}
        <Skeleton className="h-5 w-20 mb-2" />
        <div className="space-y-5">
          {/* Skeleton for heading */}
          <Skeleton className="h-6 w-3/5 mb-4" />
          <div className="space-y-2">
            {/* Skeleton for date created */}
            <Skeleton className="h-5 w-2/5 mb-2" />

            {/* Skeleton for deadline */}
            <Skeleton className="h-5 w-2/5" />
          </div>
        </div>
      </CardHeader>

      <CardFooter>
        {/* Skeleton for sub-tasks */}
        <Skeleton className="h-5 w-3/5" />{" "}
        {/* h-5 for height: 20px, w-3/5 for 60% width */}
      </CardFooter>
    </Card>
  );
};

export default TaskCardSkeleton;
