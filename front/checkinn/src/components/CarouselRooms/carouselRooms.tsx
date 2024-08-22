import React from "react";
import CarouselRoomsCard from "./carouselRoomsCard";
import RoomsButtonLeft from "./roomsButtonLeft";
import RoomsButtonRight from "./roomsButtonRight";
import { arrayRooms } from "@/utils/arrays/rooms";

const CarouselRooms = () => {
  return (
    <div className="mt-5  w-full h-[45%] bg-powerGray rounded-2xl justify-center items-center flex gap-5">
      <RoomsButtonLeft></RoomsButtonLeft>
      {arrayRooms.map((r) => (
        <CarouselRoomsCard key={r.name} dataRoom={r}></CarouselRoomsCard>
      ))}

      <RoomsButtonRight></RoomsButtonRight>
    </div>
  );
};

export default CarouselRooms;
