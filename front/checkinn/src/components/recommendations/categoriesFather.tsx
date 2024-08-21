import React from "react";
import CategoriesItem from "./categoriesItem";

const CategoriesFather = () => {
  return (
    <div className="mt-5 w-full h-[50%]  flex gap-5">
      <CategoriesItem></CategoriesItem>
      <CategoriesItem></CategoriesItem>
    </div>
  );
};

export default CategoriesFather;
