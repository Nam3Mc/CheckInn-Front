"use client";

import React, { useState } from "react";
import { ContactChat } from "./contact"; // Importamos el componente ContactChat

const Chatbot: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false); // Estado para el modal de contacto
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
    setIsChatOpen(!isChatOpen);
  };

  const handleContactClick = () => {
    setIsContactOpen(!isContactOpen); // Abre o cierra el modal de contacto
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleUserSubmit = () => {
    const index = parseInt(userInput) - 1;
    if (index >= 0 && index < faq.length) {
      setChatHistory([
        ...chatHistory,
        `Question ${userInput}: ${faq[index]}`,
        `Answer: ${faqAnswers[index]}`,
      ]);
    } else {
      setChatHistory([
        ...chatHistory,
        `Question ${userInput}: I don't have an answer for that option.`,
      ]);
    }
    setUserInput("");
  };

  return (
    <>
      <button
        className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg z-50"
        onClick={toggleChat}
      >
        Virtual assitance
      </button>

      {isChatOpen && (
        <div
        className="fixed top-0 right-0 w-200 h-full bg-gray-300 z-40 transition-transform duration-300"
        style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.3)" }}
      >
          <div className="flex justify-between items-center bg-blue-500 text-white p-4">
            <h2>Chatbot</h2>
            <button onClick={toggleChat} className="text-xl">&times;</button>
          </div>
          <div className="p-4 h-full overflow-y-auto">
            <div>
              <p><strong>How can i help you ?</strong></p>
              {faq.map((question, index) => (
                <p key={index}>{index + 1}. {question}</p>
              ))}
            </div>

            <div className="mt-4">
              {chatHistory.map((entry, index) => (
                <p key={index}>{entry}</p>
              ))}
            </div>

            <div className="mt-4">
              <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
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
          <div className="absolute bottom-16 right-5 p-4">
            <button
              onClick={handleContactClick}
              className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg"
            >
              Contact Us!
            </button>
          </div>
        </div>
      )}

      {isContactOpen && <ContactChat onClose={handleContactClick} />}
    </>
  );
};

export default Chatbot;
