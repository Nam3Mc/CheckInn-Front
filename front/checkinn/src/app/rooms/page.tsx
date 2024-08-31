"use client";

import React, { useState } from "react";
import Filter from "@/components/filteredComponents/filter";
import ProductCard from "@/components/filteredComponents/productCard";

const RoomsPage: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  return (
    <div className="flex p-5 w-full h-[90%]">
      <div className="w-1/3 h-full bg-gray-200"> {/* Contenedor para el filtro */}
        <Filter setSelectedOptions={setSelectedOptions} />
      </div>
      <div className="w-2/3 h-full bg-gray-900 flex flex-wrap items-start justify-start p-4 shadow-lg"> {/* Contenedor para las tarjetas */}
        <ProductCard selectedOptions={selectedOptions} />
      </div>
    </div>
  );
};

export default RoomsPage;
