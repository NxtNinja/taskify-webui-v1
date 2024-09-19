import Layout from "@/components/Layout";
import TaskDetailsSkeleton from "@/components/Skeleton/TaskDetailsSkeleton";
import TaskDetails from "@/components/Tasks/TaskDetails";
import { fetcher } from "@/helper/apiHelper";
import { TaskType } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const task = () => {
  const router = useRouter();
  const id = router.query.task;

  const {
    data: task,
    error,
    isLoading,
    isFetching,
    isFetched,
    isSuccess,
  } = useQuery({
    queryKey: ["task", id],
    queryFn: () =>
      fetcher<{ data: TaskType }>(`items/task/${id}?fields=*,sub_task.*`),
  });

  if (isLoading || isFetching) {
    return <TaskDetailsSkeleton />;
  }

  if (isFetched && !task) {
    return (
      <div className="text-center py-10">
        <h1 className="text-xl font-semibold">Task not found</h1>
        <p className="text-gray-600">
          The task with ID does not exist or the task was deleted.
        </p>
      </div>
    );
  }

  if (isFetched && isSuccess && task) {
    return (
      <Layout>
        <TaskDetails task={task} />
      </Layout>
    );
  }
};

export default task;
