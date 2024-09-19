import { SubTaskType } from "@/utils/types";
import SubTaskCard from "./SubTaskCard";

const DisplaySubTasks = ({ subTasks }: { subTasks: SubTaskType[] }) => {
  return (
    <>
      {subTasks.length !== 0 ? (
        subTasks.map((item) => {
          return <SubTaskCard key={item.id} subTask={item} />;
        })
      ) : (
        <div className="font-bold">No sub tasks to show</div>
      )}
    </>
  );
};

export default DisplaySubTasks;
