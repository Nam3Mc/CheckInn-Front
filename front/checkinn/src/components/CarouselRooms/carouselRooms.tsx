"use client";
import React, { useRef, useState, useEffect } from "react";
import CarouselRoomsCard from "./carouselRoomsCard";
import { getRooms } from "@/utils/CRUD/rooms/getRooms";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const CarouselRooms = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [currentSection, setCurrentSection] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [maxSections, setMaxSections] = useState(0);
  const cardsPerPage = 3; // Número de tarjetas por página

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsData = await getRooms();
        if (roomsData) {
          setRooms(roomsData);
          setMaxSections(Math.ceil(roomsData.length / cardsPerPage) - 1);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, [cardsPerPage]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth;
      if (direction === "left" && currentSection > 0) {
        setCurrentSection(currentSection - 1);
      } else if (direction === "right" && currentSection < maxSections) {
        setCurrentSection(currentSection + 1);
      }
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: currentSection * scrollAmount,
        behavior: "smooth",
      });
    }
  }, [currentSection]);

  return (
    <div className="mt-5 pt-4 w-full bg-gray-900 rounded-2xl flex items-center overflow-hidden relative p-4">
      {/* Botón de desplazamiento hacia la izquierda */}
      <button
        className={`h-16 w-16 rounded-full flex items-center justify-center ${currentSection === 0 ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-800 cursor-pointer'} absolute left-0 z-10`}
        onClick={() => scroll("left")}
        disabled={currentSection === 0}
        style={{ zIndex: 10 }}
      >
        <ArrowBackIosNewRoundedIcon className="text-white" />
      </button>

      <div
        ref={scrollContainerRef}
        className="flex flex-nowrap items-center overflow-x-auto scroll-smooth w-full"
        style={{ padding: '0 23rem' }} // Ajusta el padding para centrar las tarjetas
      >
        <div className="flex flex-nowrap" style={{ gap: '1rem', justifyContent: 'center' }}>
          {rooms.length > 0 ? (
            rooms.slice(currentSection * cardsPerPage, (currentSection + 1) * cardsPerPage).map((r: any) => (
              <div
                key={r.id}
                className="flex-shrink-0"
                style={{ width: 'calc(50% - 1rem)', maxWidth: '320px' }} // Ajusta el ancho de las tarjetas
              >
                <CarouselRoomsCard dataRoom={r} />
              </div>
            ))
          ) : (
            <p className="text-white">No rooms available</p>
          )}
        </div>
      </div>

      {/* Botón de desplazamiento hacia la derecha */}
      <button
        className={`h-16 w-16 rounded-full flex items-center justify-center ${currentSection === maxSections ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-800 cursor-pointer'} absolute right-0 z-10`}
        onClick={() => scroll("right")}
        disabled={currentSection === maxSections}
        style={{ zIndex: 10 }}
      >
        <ArrowForwardIosRoundedIcon className="text-white" />
      </button>
    </div>
  );
};

export default CarouselRooms;
