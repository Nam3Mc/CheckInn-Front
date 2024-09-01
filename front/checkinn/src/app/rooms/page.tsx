"use client";

import React, { useState } from "react";
import Filter from "@/components/filteredComponents/filter";
import ProductCard from "@/components/filteredComponents/productCard";

const RoomsPage: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  return (
    <div className="flex p-5 w-full h-[90%] gap-[20px]"> {/* Contenedor con separación de 10px */}
      <div className="w-1/3 h-full rounded-xl"
      style={{ boxShadow: " 4px 6px 6px rgba(255, 255, 255, 0.3)" }}> {/* Contenedor para el filtro */}
        <Filter setSelectedOptions={setSelectedOptions} />
      </div>
      <div className="rounded-2xl w-2/3 h-full bg-gray-800 flex flex-wrap items-start justify-start p-4 shadow-lg"
      style={{ boxShadow: " 4px 6px 6px rgba(255, 255, 255, 0.6)" }}> 
  <ProductCard selectedOptions={selectedOptions} />
</div>

    </div>
  );
};

export default RoomsPage;
