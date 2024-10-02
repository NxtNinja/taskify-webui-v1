import { fetcher } from "@/helper/apiHelper";
import { useQuery } from "@tanstack/react-query";
import { TaskType } from "./types";
import { User } from "@directus/types";

export const taskQuery = (limit: number, currentPage: number) => {
  return useQuery({
    queryKey: ["tasks", currentPage],
    queryFn: () =>
      fetcher<{ meta: { total_count: number }; data: TaskType[] }>(
        `items/task?limit=${limit}&page=${currentPage}&meta=total_count&sort=-date_created`
      ),
  });
};

export const userQuery = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => fetcher<{ data: User }>("users/me"),
    refetchOnWindowFocus: false,
  });
};