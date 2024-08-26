"use client";

import { ICategorieData } from "@/utils/interfaces/interfaces";
import Image from "next/image";
import React from "react";

const CategoriesItem = ({
  categorieData,
}: {
  categorieData: ICategorieData;
}) => {
  if (!categorieData) {
    return null;
  }

  const { name, description, img } = categorieData;

  const handleClick = () => {
    alert("Este es el evento que redirecciona a categorías");
  };

  return (
    <div
      className="w-full h-full bg-powerPurple rounded-2xl cursor-pointer shadow-lg relative overflow-hidden transform transition-transform hover:scale-105 group"
      onClick={handleClick}
    >
      {/* Imagen de fondo */}
      <Image
        src={img}
        alt={name}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
      />

      {/* Overlay para el hover */}
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>

      {/* Contenido del componente */}
      <div className="relative z-20 p-4 h-full flex flex-col justify-center items-center text-center ">
        <h2 className="text-3xl font-bold text-white "  style={{
    WebkitTextStroke: "0.8px black",
    color: "white",
  }}>{name}</h2>
        <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CategoriesItem;
