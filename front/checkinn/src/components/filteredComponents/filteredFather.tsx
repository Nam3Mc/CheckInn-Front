import React from "react";
import Filter from "./filter";
import ProductsList from "./productsList";

const FilteredFather = () => {
  return (
    <div className="p-5 w-[full] h-[90%]  flex gap-5 ">
      <Filter></Filter>
      <ProductsList></ProductsList>
    </div>
  );
};

export default FilteredFather;
