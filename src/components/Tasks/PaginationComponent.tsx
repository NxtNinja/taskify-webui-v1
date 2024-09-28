import React from "react";
import { Pagination } from "@nextui-org/pagination";
import { Button } from "@nextui-org/button";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

export default function PaginationComponent({
  currentPage,
  setCurrentPage,
  totalPages,
}: PaginationProps) {
  return (
    <div className="flex flex-col gap-5">
      <Pagination
        total={totalPages}
        color="primary"
        page={currentPage}
        onChange={setCurrentPage}
      />
    </div>
  );
}
