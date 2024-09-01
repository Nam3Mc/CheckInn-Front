"use client";
import { IRoom } from "@/utils/interfaces/interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const CarouselRoomsCard = ({ dataRoom }: any) => {
  const router = useRouter();
  const { id, name, description, photos, price } = dataRoom;

  const handlerClick = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("room", String(id));
      router.push(`/rooms/${id}`);
    }
  };

  return (
    <div
      className="flex flex-col w-[20%] h-[90%] bg-gray-400 rounded-2xl justify-center p-3 cursor-pointer transform transition-transform hover:scale-105"
      onClick={handlerClick}
      style={{ transition: "0.5s" }}
      aria-label={`Room ${name}`}
    >
      <div className="relative w-full h-0 pb-[56.25%]"> {/* Mantiene la relación de aspecto */}
        <Image
          src={photos}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
          priority
        />
      </div>
      <div className="mt-2 text-center">
        <p className="font-bold text-lg">{name}</p>
        <p className="text-black">{description}</p>
        <span className="text-xl font-semibold">${price}</span>
      </div>
    </div>
  );
};

export default CarouselRoomsCard;
