import React from "react";
import CarouselRoomsCard from "./carouselRoomsCard";
import RoomsButtonLeft from "./roomsButtonLeft";
import RoomsButtonRight from "./roomsButtonRight";

const CarouselRooms = () => {
  return (
    <div className="mt-5  w-full h-[45%] bg-powerGray rounded-2xl justify-center items-center flex gap-5">
      <RoomsButtonLeft></RoomsButtonLeft>
      <CarouselRoomsCard></CarouselRoomsCard>
      <CarouselRoomsCard></CarouselRoomsCard>
      <CarouselRoomsCard></CarouselRoomsCard>
      <CarouselRoomsCard></CarouselRoomsCard>
      <RoomsButtonRight></RoomsButtonRight>
    </div>
  );
};

export default CarouselRooms;
