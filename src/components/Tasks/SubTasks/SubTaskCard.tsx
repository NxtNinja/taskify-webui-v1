import { SubTaskType } from "@/utils/types";
import { Card, CardHeader } from "@nextui-org/card";
import { Delete, DeleteIcon, Edit, Trash } from "lucide-react";

const SubTaskCard = ({ subTask }: { subTask: SubTaskType }) => {
  return (
    <>
      <Card radius="sm" className="border" shadow="none">
        <CardHeader className="flex justify-between items-center">
          <div className="flex gap-3">
            <p>title:</p> <span className="font-bold">{subTask.heading}</span>
          </div>
          <div className="flex items-center gap-2">
            <Edit className="text-yellow-500" />
            <Trash className="text-red-500" />
          </div>
        </CardHeader>
      </Card>
    </>
  );
};

export default SubTaskCard;
