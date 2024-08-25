"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const CarouselWelcome = () => {
  const router = useRouter();
  return (
    <motion.div
      className="flex flex-col w-full h-[45%] bg-powerPurple rounded-2xl justify-center items-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <p className="font-plus-jakarta-sans text-[2.5rem] font-light text-lavenderBlush mb-2">
        Welcome to
      </p>
      <p className="font-plus-jakarta-sans text-[3rem] text-lavenderBlush">
        ChechINN
      </p>
      <button
        className="mt-4 px-4 py-2 bg-lavenderBlush text-powerPurple rounded-lg hover:bg-opacity-80 transition"
        onClick={() => router.push("/rooms")}
      >
        Get Started
      </button>
    </motion.div>
  );
};

export default CarouselWelcome;
