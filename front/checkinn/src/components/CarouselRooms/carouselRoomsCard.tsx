"use client";
import { IRoom } from "@/utils/interfaces/interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const CarouselRoomsCard = ({ dataRoom }: { dataRoom: IRoom }) => {
  const router = useRouter();
  const { name, description, beds, baths, photos, capacity, price } = dataRoom;
  const handlerClick = () => {
    alert(
      "este es el evento que va a redireccionar a la ruta dinámica [detailRoom]"
    );
    router.push(`/rooms/${name}`);
  };
  return (
    <div
      className="flex-col w-[20%] h-[90%] bg-powerBackground rounded-2xl justify-center flex  p-3 cursor-pointer hover:w-[21%] "
      onClick={() => handlerClick()}
      style={{ transition: "0.5s" }}
    >
      <Image
        src={photos}
        alt={name}
        width={400}
        height={100}
        className="rounded-md"
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
