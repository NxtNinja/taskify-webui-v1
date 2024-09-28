import { fetcher } from "@/helper/apiHelper";
import { useQuery } from "@tanstack/react-query";
import { TaskType } from "./types";

export const taskQuery = (limit: number, currentPage: number) => {
  return useQuery({
    queryKey: ["tasks", currentPage],
    queryFn: () =>
      fetcher<{ meta: { total_count: number }; data: TaskType[] }>(
        `items/task?limit=${limit}&page=${currentPage}&meta=total_count&sort=-date_created`
      ),
  });
};
