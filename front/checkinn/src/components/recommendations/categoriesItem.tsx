import { ICategorieData } from "@/utils/interfaces/interfaces";
import React from "react";

const CategoriesItem = ({
  categorieData,
}: {
  categorieData: ICategorieData;
}) => {
  if (!categorieData) {
    return null;
  }
  const { name, description } = categorieData;
  return (
    <div className=" w-full h-full bg-powerPurple rounded-2xl">
      CategoriesItem
      <p>{name}</p>
      <p>{description}</p>
    </div>
  );
};

export default CategoriesItem;
