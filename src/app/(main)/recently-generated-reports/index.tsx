"use client";

import React, { useEffect, useState } from "react";
import { FileDownIcon } from "lucide-react";

import { IReportDetails } from "@/types";
import { Table } from "@/components";
import GlobalApi from "@/shared/GlobalApi";
import "./styles.css";

interface IRecentlyGeneratedReportsProps {
  handleDialogShow: () => void;
}

const RecentlyGeneratedReports: React.FC<IRecentlyGeneratedReportsProps> = ({
  handleDialogShow,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reports, setReports] = useState<IReportDetails[]>([]);
  const [pgNumber, setPgNumber] = useState<number>(1);
  const [pgSize, setPgSize] = useState<number>(10);

  useEffect(() => {
    const getReports = () => {
      GlobalApi.getReports(pgNumber, pgSize).then((resp) => {
        setReports(resp.data.reportDetails);
        setIsLoading(false);
      });
    };

    getReports();
  }, [pgNumber, pgSize]);

  function generateRandomDateTime() {
    const year = 2021 + Math.floor(Math.random() * 4);
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    const hour = Math.floor(Math.random() * 12) + 1;
    const minute = Math.floor(Math.random() * 60);
    const period = Math.random() < 0.5 ? "AM" : "PM";

    const formattedDate = `${day.toString().padStart(2, "0")}.${month
      .toString()
      .padStart(2, "0")}.${year}`;
    const formattedTime = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")} ${period}`;

    return { date: formattedDate, time: formattedTime };
  }

  return (
    <Table
      title="Recently Generated Reports"
      handleClose={handleDialogShow}
      pgNumber={pgNumber}
      pgSize={pgSize}
      setPgNumber={setPgNumber}
      setPgSize={setPgSize}
    >
      <div className="h-[60vh] border-b-[1px] border-grayText/20">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-black/20 rounded-full loader"></div>
          </div>
        ) : (
          <div className="h-[60vh] text-[15px] flex flex-col overflow-y-auto pb-3">
            {reports.map((report, index) => {
              const { date, time } = generateRandomDateTime();

              return (
                <div
                  key={index}
                  className="flex font-[500] pt-5 px-7 text-black/70"
                >
                  <div className="w-32 text-left">
                    <p>{date}</p>
                    <p className="text-[13px]">{time}</p>
                  </div>
                  <p className="flex-grow overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {report.title}
                  </p>
                  <FileDownIcon className="text-center mr-[20px] cursor-pointer" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Table>
  );
};

export default RecentlyGeneratedReports;
