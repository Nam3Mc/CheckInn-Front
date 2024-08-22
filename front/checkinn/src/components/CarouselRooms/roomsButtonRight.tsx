"use client";
import React from "react";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
const RoomsButtonRight = () => {
  const handlerClick = () => {
    alert("este es el evento de la flecha derecha");
  };
  return (
    <div
      className=" h-16 w-16 rounded-full 
    "
      onClick={() => handlerClick()}
    >
      <ArrowForwardIosRoundedIcon className="size-auto text-powerBackground cursor-pointer"></ArrowForwardIosRoundedIcon>
    </div>
  );
};

export default RoomsButtonRight;
