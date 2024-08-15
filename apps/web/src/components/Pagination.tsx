"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC } from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  onPageChange: ({ selected }: { selected: number }) => void;
  total: number;
  take: number;
}

const Pagination: FC<PaginationProps> = ({ take, total, onPageChange }) => {
  return (
    <ReactPaginate
      breakLabel={<span>...</span>}
      nextLabel={<ChevronRight />}
      previousLabel={<ChevronLeft />}
      pageCount={Math.ceil(total / take)}
      renderOnZeroPageCount={null}
      containerClassName="flex gap-4 w-fit m-4"
      pageLinkClassName="p-2 rounded-lg"
      activeLinkClassName="bg-black text-white"
      onPageChange={onPageChange}
    />
  );
};

export default Pagination;