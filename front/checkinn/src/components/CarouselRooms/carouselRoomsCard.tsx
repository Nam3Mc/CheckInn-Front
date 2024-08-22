import { IRoom } from "@/utils/interfaces/interfaces";
import Image from "next/image";
import React from "react";

const CarouselRoomsCard = ({ dataRoom }: { dataRoom: IRoom }) => {
  const { name, description, beds, baths, photos, capacity, price } = dataRoom;
  return (
    <div className="flex-col w-[20%] h-[90%] bg-powerBackground rounded-2xl justify-center flex  p-3">
      <Image
        src={photos}
        alt={name}
        width={400}
        height={100}
        className="rounded-lg"
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
