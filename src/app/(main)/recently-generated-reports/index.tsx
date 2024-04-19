"use client";

import React, { useEffect, useState } from "react";

import { IReportDetails } from "@/types";
import { Table } from "@/components";
import GlobalApi from "@/shared/GlobalApi";

interface IRecentlyGeneratedReportsProps {
  handleDialogShow: () => void;
}

const RecentlyGeneratedReports: React.FC<IRecentlyGeneratedReportsProps> = ({
  handleDialogShow,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reports, setReports] = useState<IReportDetails[]>([]);

  const getReports = () => {
    GlobalApi.getReports(2, 5).then((resp) => {
      setReports(resp.data.reportDetails);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getReports();
  }, []);

  console.log("====================================");
  console.log(reports);
  console.log("====================================");

  return (
    <Table title="Recently Generated Reports" handleClose={handleDialogShow}>
      Content
    </Table>
  );
};

export default RecentlyGeneratedReports;
