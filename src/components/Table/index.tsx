import React from "react";
import { Filter, X } from "lucide-react";

import { Pagination } from "@/components";

interface ITableProps {
  title: string;
  handleClose: () => void;
}

const Table: React.FC<ITableProps> = ({ title, handleClose }) => {
  return (
    <div>
      <div className="flex justify-between items-center my-5 mx-7">
        <div className="block" />

        <h2 className="text-[18px] font-[600]">{title}</h2>

        <div className="flex gap-3">
          <Filter
            className="border-[2px] h-[28px] w-[28px] border-grayText rounded-lg p-[3px] cursor-pointer"
            color="#929292"
            strokeWidth={3}
          />
          <X
            className="border-[2px] h-[28px] w-[28px] border-grayText rounded-lg p-[3px] cursor-pointer"
            strokeWidth={3}
            color="#929292"
            onClick={handleClose}
          />
        </div>
      </div>

      <div>
        <div className="bg-black/5 flex items-center text-[15px] font-semibold text-black/50 py-1 px-7">
          <p className="w-32 text-left">Date</p>
          <p className="flex-grow">Report Name</p>
          <p className="text-center">Download</p>
        </div>
        Content
        <Pagination />
      </div>
    </div>
  );
};

export default Table;
