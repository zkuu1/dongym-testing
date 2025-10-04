"use client";

import { useState } from "react";

interface ModalMessageProps {
  title: string;
  message: string;
  type?: "success" | "error" | "info";
  onClose?: () => void;
}

const ModalMessage = ({ title, message, type = "info", onClose }: ModalMessageProps) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`bg-white p-6 rounded-lg shadow-xl max-w-md w-full border-l-4 
        ${
          type === "success"
            ? "border-green-500"
            : type === "error"
            ? "border-red-500"
            : "border-blue-500"
        }`}
      >
        <h3
          className={`text-lg font-semibold mb-2 
          ${
            type === "success"
              ? "text-green-600"
              : type === "error"
              ? "text-red-600"
              : "text-blue-600"
          }`}
        >
          {title}
        </h3>
        <p className="text-gray-700 mb-6">{message}</p>

        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className={`px-4 py-2 rounded text-sm font-medium text-white
              ${
                type === "success"
                  ? "bg-green-600 hover:bg-green-700"
                  : type === "error"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalMessage;
