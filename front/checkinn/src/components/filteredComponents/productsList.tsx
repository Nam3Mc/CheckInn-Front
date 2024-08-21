import React from "react";
import ProductCard from "./productCard";

const ProductsList = () => {
  return (
    <div className="p-2 w-[66%] h-full bg-white rounded-2xl grid grid-cols-2 gap-3 auto-rows-fr ">
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
    </div>
  );
};

export default ProductsList;
