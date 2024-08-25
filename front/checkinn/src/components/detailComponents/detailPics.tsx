"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const DetailPics = ({ dataIMG }: { dataIMG: string | string[] }) => {
  const images = Array.isArray(dataIMG) ? dataIMG : [dataIMG];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Cambia de imagen cada 3 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="w-full h-full bg-orchid rounded-2xl overflow-hidden relative">
      <Image
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        layout="fill"
        objectFit="cover"
        className="rounded-2xl"
      />

      <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-between items-center p-4">
        <button
          className="bg-white p-2 rounded-full shadow-lg"
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === 0 ? images.length - 1 : prevIndex - 1
            )
          }
        >
          ❮
        </button>
        <button
          className="bg-white p-2 rounded-full shadow-lg"
          onClick={() =>
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
          }
        >
          ❯
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default DetailPics;
