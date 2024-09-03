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

  const buttonText = userRole === "admin" ? "Support" : "Contact Us!";
  const chatComponent = userRole === "admin" ? SupportChat : ContactChat;

  return (
    <>
      <button
        className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg z-50"
        onClick={toggleChat}
      >
        Virtual assistance
      </button>

      <div
        className={`fixed top-0 right-0 w-200 h-full bg-gray-300 z-40 transition-transform duration-300 transform ${
          isChatOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.3)" }}
      >
        <div className="relative h-full flex flex-col">
          <div className="flex justify-between items-center bg-blue-500 text-white p-4">
            <h2>Chatbot</h2>
            <button onClick={toggleChat} className="text-xl">&times;</button>
          </div>
          <div className="flex-grow p-4 flex flex-col justify-between">
            <div>
              <p><strong>How can I help you?</strong></p>
              {faq.map((question, index) => (
                <p key={index}>{index + 1}. {question}</p>
              ))}
            </div>

            <div className="mt-4 flex-grow overflow-y-auto">
              {chatHistory.map((entry, index) => (
                <p key={index}>{entry}</p>
              ))}
            </div>

            <div className="mt-4 pb-[150px]">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="border p-2 rounded w-full"
                placeholder="Enter the question number"
              />
              <button
                onClick={handleUserSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"
              >
                Send
              </button>
            </div>
          </div>
          <button
            onClick={handleContactClick}
            className="absolute bottom-16 right-5 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg"
          >
            {buttonText}
          </button>
        </div>
      </div>

      {React.createElement(chatComponent, { onClose: handleContactClick, isOpen: isContactOpen })}
    </>
  );
};

export default Chatbot;
