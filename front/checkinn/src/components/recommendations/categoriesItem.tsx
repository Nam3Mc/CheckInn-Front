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
  const handlerClick = () => {
    alert("este es el evento que redirecciona a categorias");
  };
  return (
    <div
      className=" w-full h-full bg-powerPurple rounded-2xl cursor-pointer"
      onClick={() => handlerClick()}
    >
      CategoriesItem
      <p>{name}</p>
      <p>{description}</p>
      <Image
        src={img}
        alt={name}
        width={400}
        height={400}
        className="rounded-md"
      ></Image>
    </div>
  );
};

export default CategoriesItem;
