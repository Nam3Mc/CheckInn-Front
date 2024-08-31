"use client";

import React from "react";

const ContactChat: React.FC = () => {
  return (
    <div className="fixed top-0 right-0 w-1/3 h-full bg-gray-100 shadow-lg z-40">
      <div className="flex justify-between items-center bg-blue-500 text-white p-4">
        <h2>Contact Chat</h2>
        <button className="text-xl">&times;</button>
      </div>
      <div className="p-4 h-full overflow-y-auto">
        <p>Welcome to the Contact Chat!</p>
        <p>This chat is currently empty but will be similar to the chatbot.</p>
      </div>
    </div>
  );
};

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ContactChat />
    </div>
  );
};

export default Contact;
