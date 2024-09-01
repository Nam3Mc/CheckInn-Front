import React from "react";
import CategoriesItem from "./categoriesItem";
import { arrayCategories1 } from "@/utils/arrays/arrayCategories1";
const CategoriesFather = () => {
  return (
    <div className="mt-5 w-full h-[50%]  flex gap-5">
      {arrayCategories1.map((cat) => (
        <div className="w-full h-full" key={Math.random()}>
          <CategoriesItem categorieData={cat}></CategoriesItem>
        </div>
      ))}
    </div>
  );
};

export default CategoriesFather;