"use client";
import React, { useEffect, useState } from "react";
import CarouselRoomsCard from "./carouselRoomsCard";
import RoomsButtonLeft from "./roomsButtonLeft";
import RoomsButtonRight from "./roomsButtonRight";
import { getRooms } from "@/utils/CRUD/rooms/getRooms";

const CarouselRooms = () => {
  const [rooms, setRooms] = useState([]);

  // Efecto para obtener las habitaciones
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsData = await getRooms();
        if (roomsData) {
          // Verificación explícita
          setRooms(roomsData);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="mt-5  w-full h-[45%] bg-gray-900 rounded-2xl justify-center items-center flex gap-5">
      <RoomsButtonLeft />
      {rooms.length > 0 ? (
        rooms.map((r: any) => (
          <CarouselRoomsCard key={r.name} dataRoom={r} /> // Suponiendo que r.name es único
        ))
      ) : (
        <p>No rooms available</p> // Mensaje de fallback si no hay habitaciones
      )}
      <RoomsButtonRight />
    </div>
  );
};

export default CarouselRooms;
