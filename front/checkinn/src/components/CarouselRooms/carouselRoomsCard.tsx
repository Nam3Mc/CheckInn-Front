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
      className="flex-col w-[20%] h-[90%] bg-powerBackground rounded-2xl justify-center flex p-3 cursor-pointer hover:w-[21%]"
      onClick={handlerClick}
      style={{ transition: "0.5s" }}
      aria-label={`Room ${name}`}
    >
      <img /* image */
        src={photos}
        alt={name}
        width={400}
        height={100}
        className="rounded-md"
        /*        layout="responsive" */
        /*        priority */
      />
      <p>
        <b>{name}</b>
      </p>
      <p className="text-powerGray">{description}</p>
      <span>${price}</span>
    </div>
  );
};

export default CarouselRoomsCard;
