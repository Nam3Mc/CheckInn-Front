"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const CarouselWelcome = () => {
  const router = useRouter();
  
  return (
    <motion.div
      className="flex flex-col w-full h-[45%] bg-gray-800 rounded-2xl justify-center items-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <p
        className="font-plus-jakarta-sans text-[3rem] font-light text-lavenderBlush mb-2 slide-in-left"
        style={{
          WebkitTextStroke: "0.5px black",
          color: "white",
        }}
      >
        Welcome to
      </p>
      <p
        className="font-plus-jakarta-sans text-[5rem] text-lavenderBlush slide-in-right"
        style={{
          WebkitTextStroke: "0.5px black",
          color: "white",
        }}
      >
        CheckINN
      </p>
      <button
  className="mt-4 px-4 py-2 bg-lavenderBlush text-powerPurple rounded-lg hover:bg-opacity-80 transform transition-transform hover:scale-110"
  style={{ boxShadow: "0 4px 15px rgba(255, 255, 255, 0.6)" }}
  onClick={() => router.push("/login")}
>
  Get Started
</button>

    </motion.div>
  );
};

export default CarouselWelcome;
