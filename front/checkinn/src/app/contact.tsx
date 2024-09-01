"use client";

import React from "react";

interface ContactChatProps {
  onClose: () => void;
}

export const ContactChat: React.FC<ContactChatProps> = ({ onClose }) => {
  return (
    <div className="fixed top-0 right-0 w-1/3 h-full bg-gray-100 shadow-lg z-40">
      <div className="flex justify-between items-center bg-blue-500 text-white p-4">
        <h2>Contact Chat</h2>
        <button onClick={onClose} className="text-xl">&times;</button>
      </div>
      <div className="p-4 h-full overflow-y-auto">
        <p>Welcome to the Contact Chat!</p>
        <p>Work in progress.</p>
      </div>
      <div className="absolute bottom-16 right-5 p-4">
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg"
        >
          Close Contact
        </button>
      </div>
    </div>
  );
};

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ContactChat onClose={() => {}} />
    </div>
  );
};

export default Contact;
