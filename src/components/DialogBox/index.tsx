import React from "react";

interface IDialogBoxProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const DialogBox: React.FC<IDialogBoxProps> = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
      <div className="w-[800px] bg-white p-2 rounded shadow-lg">{children}</div>
    </div>
  );
};

export default DialogBox;
