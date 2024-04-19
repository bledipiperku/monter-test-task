"use client";

import React, { FC, useState } from "react";

import { DialogBox } from "@/components";
import RecentlyGeneratedReports from "./recently-generated-reports";

const Home: FC = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const handleDialogShow = () => {
    setShowDialog(!showDialog);
  };

  return (
    <main className="flex justify-center items-center flex-col min-h-screen">
      <button
        className="px-4 py-2 border rounded hover:bg-black hover:text-white transition-colors"
        onClick={handleDialogShow}
      >
        Recently Generated Reports
      </button>

      {showDialog && (
        <DialogBox isOpen={showDialog}>
          <RecentlyGeneratedReports handleDialogShow={handleDialogShow} />
        </DialogBox>
      )}
    </main>
  );
};

export default Home;
