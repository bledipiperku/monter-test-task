import React, { useState } from "react";
import { ChevronDown, ChevronFirst, ChevronLast } from "lucide-react";

interface IPaginationProps {
  pgNumber: number;
  pgSize: number;
  setPgNumber: (pageNumber: number) => void;
  setPgSize: (size: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({
  pgNumber,
  pgSize,
  setPgNumber,
  setPgSize,
}) => {
  const [dropDownVisible, setDropDownVisibility] = useState<boolean>(false);

  const handleSelectPageSize = (size: number) => {
    setPgSize(size);
    setDropDownVisibility(false);
  };
  const handlePageChange = (pageNumber: number) => {
    setPgNumber(pageNumber);
  };

  const renderPaginationButton = (pageNumber: number, label: number) => {
    return (
      <div
        key={pageNumber}
        role="button"
        className={`flex border-[1px] border-grayText/30 rounded-lg py-1 px-3  ${
          pgNumber === pageNumber ? "bg-secondary text-white" : ""
        }`}
        onClick={() => handlePageChange(pageNumber)}
      >
        <p>{label}</p>
      </div>
    );
  };

  return (
    <div className="flex py-4 gap-2 text-[15px] justify-center items-center text-sm font-semibold text-grayText">
      <div className="flex py-4 gap-2 justify-center items-center">
        <button
          className="flex gap-1 items-center mr-[10px]"
          role="button"
          onClick={() => handlePageChange(pgNumber - 1)}
          disabled={pgNumber - 1 < 1}
        >
          <ChevronFirst color="#929292" />
          <p>Prev</p>
        </button>
        {Array.from({ length: 5 }, (_, index) =>
          renderPaginationButton(index + 1, index + 1)
        )}
        <button
          className="flex gap-1 items-center ml-[10px]"
          role="button"
          onClick={() => handlePageChange(pgNumber + 1)}
          disabled={pgNumber + 1 > 5}
        >
          <p>Next</p>
          <ChevronLast color="#929292" />
        </button>
      </div>

      <div
        className="flex ml-10 gap-2 items-center"
        role="button"
        onClick={() => setDropDownVisibility(!dropDownVisible)}
      >
        <p>Rows per page</p>
        <div className="flex border-[1px] rounded-lg py-[3px] px-3 items-center gap-2 border-grayText/20 text-black/70">
          {dropDownVisible && (
            <div className="flex flex-col absolute bg-white border rounded-lg ml-[-13px]">
              {[10, 25, 50, 100].map((size, index, Array) => (
                <div
                  key={size}
                  className={`
                    py-2 px-4 cursor-pointer hover:bg-secondary/20  
                    ${pgSize === size ? "bg-secondary text-white" : ""}
                    ${index === 0 ? "rounded-t-[7px]" : ""}
                    ${index === Array.length - 1 ? "rounded-b-[7px]" : ""}
                  `}
                  onClick={() => handleSelectPageSize(size)}
                >
                  <div>{size}</div>
                </div>
              ))}
            </div>
          )}
          <p>{pgSize}</p>
          <ChevronDown size={17} />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
