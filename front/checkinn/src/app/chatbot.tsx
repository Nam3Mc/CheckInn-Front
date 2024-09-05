"use client";

import React, { useState } from "react";
import { ContactChat } from "./contact";
import { SupportChat } from "./support"; // Importa el componente de soporte si es necesario

interface ChatbotProps {
  userRole: string; // Agrega una prop para el rol del usuario
}

const Chatbot: React.FC<ChatbotProps> = ({ userRole }) => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const faq = [
    "How can I make a reservation?",
    "What payment methods are available?",
    "Can I cancel my reservation?",
    "How do I contact customer support?",
  ];

  const faqAnswers = [
    "To make a reservation, go to the reservations section on our website and follow the instructions.",
    "We accept credit cards, debit cards, and PayPal.",
    "You can cancel your reservation up to 24 hours before the check-in date with no charge.",
    "You can contact customer support by emailing us at support@example.com or calling +123456789.",
  ];

  const toggleChat = () => {
    if (isContactOpen) {
      setIsContactOpen(false); // Cierra el contacto si está abierto
    }
    setIsChatOpen(!isChatOpen); // Abre o cierra el chat
  };

  const handleContactClick = () => {
    if (isChatOpen) {
      setIsChatOpen(false); // Cierra el chatbot si está abierto
    }
    setIsContactOpen(!isContactOpen); // Abre o cierra el modal de contacto o soporte
  };

  const handleUserSubmit = () => {
    const index = parseInt(userInput) - 1;
    const newChatHistory = [...chatHistory];
    if (index >= 0 && index < faq.length) {
      newChatHistory.push(
        `Question ${userInput}: ${faq[index]}`,
        `Answer: ${faqAnswers[index]}`
      );
    } else {
      newChatHistory.push(
        `Question ${userInput}: I don't have an answer for that option.`
      );
    }
    setChatHistory(newChatHistory);
    setUserInput("");
  };

  const handleFaqClick = (index: number) => {
    const newChatHistory = [...chatHistory];
    newChatHistory.push(
      `Question ${index + 1}: ${faq[index]}`,
      `Answer: ${faqAnswers[index]}`
    );
    setChatHistory(newChatHistory);
  };

  const buttonText = userRole === "admin" ? "Support" : "Contact Us!";
  const chatComponent = userRole === "admin" ? SupportChat : ContactChat;

  return (
    <>
      {!isChatOpen && !isContactOpen && (
        <button
          className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg z-50 transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none"
          onClick={toggleChat}>
          Virtual assistance
        </button>
      )}

      <div
        className={`fixed bottom-0 right-5 w-80 max-h-[80vh] bg-white z-40 transition-transform duration-300 transform ${
          isChatOpen ? "translate-y-0" : "translate-y-full"
        } shadow-lg rounded-t-lg overflow-hidden flex flex-col`}>
        <div className="relative flex-grow flex flex-col h-full">
          <div className="flex justify-between items-center bg-blue-600 text-white p-3 rounded-t-lg shadow-md">
            <h2 className="text-lg font-semibold">Chatbot</h2>
            <button
              onClick={toggleChat}
              className="text-2xl font-bold focus:outline-none">
              &times;
            </button>
          </div>
          <div className="flex-grow p-4 flex flex-col justify-between bg-gray-50 overflow-y-auto">
            <div className="mb-4">
              <p className="text-md font-medium text-gray-700">
                How can I help you?
              </p>
              <ul className="mt-2 space-y-1">
                {faq.map((question, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-600 hover:text-blue-500 cursor-pointer"
                    onClick={() => handleFaqClick(index)}>
                    {index + 1}. {question}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-grow overflow-y-auto mb-4 bg-white p-3 rounded-lg shadow-inner">
              {chatHistory.map((entry, index) => (
                <p key={index} className="text-sm text-gray-800 my-1">
                  {entry}
                </p>
              ))}
            </div>

            <div className="mt-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter the question number"
              />
              <button
                onClick={handleUserSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded mt-2 w-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                Send
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center pb-4">
          <button
            onClick={handleContactClick}
            className="bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 mt-2">
            {buttonText}
          </button>
        </div>
      </div>

      {isContactOpen &&
        React.createElement(chatComponent, {
          onClose: handleContactClick,
          isOpen: isContactOpen,
        })}
    </>
  );
};

export default Chatbot;
