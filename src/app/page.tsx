"use client";

import DialogBox from "@/components/DialogBox";
import React, { FC, useState } from "react";

const Home: FC = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const handleShowClick = () => {
    setShowDialog(!showDialog);
  };

  return (
    <main className="flex justify-center items-center flex-col min-h-screen">
      <button
        className="px-4 py-2 border rounded hover:bg-black hover:text-white transition-colors"
        onClick={handleShowClick}
      >
        Recently Generated Report
      </button>

      {showDialog && <DialogBox isOpen={showDialog}>Dialog</DialogBox>}
    </main>
  );
};

export default Home;
