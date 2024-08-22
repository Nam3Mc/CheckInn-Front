import React from "react";
import CategoriesItem from "./categoriesItem";
import { arrayCategories2 } from "@/utils/arrays/arrayCategories2";
const CategoriesFather2 = () => {
  return (
    <div className="mt-5 w-full h-[50%] mb-10 flex gap-5">
      {arrayCategories2.map((cat) => (
        <div className="mt-5  w-full h-full " key={Math.random()}>
          <CategoriesItem categorieData={cat}></CategoriesItem>
        </div>
      ))}
    </div>
  );
};

export default CategoriesFather2;
