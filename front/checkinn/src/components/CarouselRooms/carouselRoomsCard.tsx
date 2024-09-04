"use client";
import { IRoom } from "@/utils/interfaces/interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const CarouselRoomsCard = ({ dataRoom }: { dataRoom: IRoom }) => {
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
      className="flex flex-col w-80 h-96 bg-gray-200 rounded-2xl justify-between p-6 cursor-pointer transform transition-transform hover:scale-105 shadow-md overflow-hidden"
      onClick={handlerClick}
      style={{ transition: "0.5s" }}
      aria-label={`Room ${name}`}
    >
      <div className="relative w-full h-52 overflow-hidden rounded-md">
        <Image
          src={photos}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
          priority
        />
      </div>
      <div className="flex flex-col mt-4 h-40">
        <p className="font-bold text-xl text-gray-800">{name}</p>
        <p className="text-gray-600 text-sm overflow-hidden h-20 mt-2">
          {description}
        </p>
        <span className="text-2xl font-semibold text-green-600 mt-2">
          ${price}
        </span>
      </div>
    </div>
  );
};

export default CarouselRoomsCard;
