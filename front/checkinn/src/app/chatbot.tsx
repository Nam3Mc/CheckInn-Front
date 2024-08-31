"use client";

import React, { useState } from "react";

const Chatbot: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <button
        className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg z-50"
        onClick={toggleChat}
      >
        Chat
      </button>

      {isChatOpen && (
        <div className="fixed top-0 right-0 w-1/3 h-full bg-gray-100 shadow-lg z-40 transition-transform duration-300">
          <div className="flex justify-between items-center bg-blue-500 text-white p-4">
            <h2>Chatbot</h2>
            <button onClick={toggleChat} className="text-xl">&times;</button>
          </div>
          <div className="p-4 h-full overflow-y-auto">
            <p>Contenido del chatbot</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
