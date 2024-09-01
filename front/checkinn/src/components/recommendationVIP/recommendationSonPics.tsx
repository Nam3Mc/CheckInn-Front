"use client";
import React, { useState, useEffect } from "react";
import { IimgVIP } from "@/utils/interfaces/interfaces";
import Image from "next/image";

export const RecommendationSonPic = ({ imgVIP }: { imgVIP: IimgVIP }) => {
  // Initialize state and effect hooks unconditionally
  const [currentIndex, setCurrentIndex] = useState(0);

  // Effect to handle automatic image switching
  useEffect(() => {
    if (!imgVIP) return; // Return early if imgVIP is not available

    const { img1, img2, img3, img4 } = imgVIP;
    const images = [img1, img2, img3, img4];

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [imgVIP]); // Dependency array includes imgVIP to restart effect on imgVIP change

  if (!imgVIP) {
    return null; // Early return if imgVIP is not available
  }

  const { img1, img2, img3, img4 } = imgVIP;
  const images = [img1, img2, img3, img4];

  return (
    <div className="w-full h-full bg-orchid rounded-2xl overflow-hidden relative transform transition-transform">
      <Image
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        layout="fill"
        objectFit="cover"
        className="rounded-2xl"
        priority // Optional: Use if images are critical for initial render
      />
      
      {/* Text with larger size */}
      <div className="absolute bottom-0 left-0 p-6 text-white bg-black bg-opacity-80 rounded-t-2xl">
        <h2 className="text-2xl font-bold">&quot;Live a unique experience&quot;</h2>
        <p className="text-lg">The comfort of our rooms at your fingertips.</p>
      </div>

      {/* Navigation buttons */}
      <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-between items-center p-4">
        <button
          aria-label="Previous image"
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
          aria-label="Next image"
          className="bg-white p-2 rounded-full shadow-lg"
          onClick={() =>
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
          }
        >
          ❯
        </button>
      </div>

      {/* Pagination dots */}
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

export default RecommendationSonPic;
