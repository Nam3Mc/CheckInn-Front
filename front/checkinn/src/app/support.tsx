"use client";

import React, { useState } from "react";

interface SupportChatProps {
  onClose: () => void;
  isOpen: boolean;
}

export const SupportChat: React.FC<SupportChatProps> = ({ onClose, isOpen }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-1/4 h-full bg-gray-300 shadow-lg z-40 transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.3)" }}
    >
      <div className="relative h-full flex flex-col">
        <div className="flex justify-between items-center bg-blue-500 text-white p-4">
          <h2>Support Chat</h2>
          <button onClick={onClose} className="text-xl">&times;</button>
        </div>
        <div className="p-4 flex-grow overflow-y-auto">
          <p>Welcome to the Support Chat!</p>
          <p>Work in progress.</p>
        </div>
        <button
          onClick={onClose}
          className="absolute bottom-16 right-5 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg"
        >
          Close Support
        </button>
      </div>
    </div>
  );
};

const Support: React.FC = () => {
  const [isSupportOpen, setIsSupportOpen] = useState<boolean>(false);

  const handleSupportClick = () => {
    setIsSupportOpen(!isSupportOpen);
  };

  return (
    <>
      <button
        className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg z-50"
        onClick={handleSupportClick}
      >
        Contact Us!
      </button>

      <SupportChat onClose={handleSupportClick} isOpen={isSupportOpen} />
    </>
  );
};

export default Support;
