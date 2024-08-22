"use client";
import React from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
const RoomsButtonLeft = () => {
  const handlerClick = () => {
    alert("este es el evento de la flecha izquierda");
  };
  return (
    <div
      className=" h-16 w-16 rounded-full 
    "
      onClick={() => handlerClick()}
    >
      <ArrowBackIosNewRoundedIcon className="size-auto text-powerBackground cursor-pointer"></ArrowBackIosNewRoundedIcon>
    </div>
  );
};

export default RoomsButtonLeft;
