import React, { useState } from "react";
import Filter from "./filter";
import ProductsList from "./productsList";

const FilteredFather: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['', '', '', '']);

  return (
    <div className="x">
      <div className=""> {/* Contenedor para el filtro */}
        <Filter setSelectedOptions={setSelectedOptions} />
      </div>
      <div className="w-[100%] h-full overflow-auto m-5 gap-[20px]" > {/* Contenedor para las tarjetas */}
        <ProductsList selectedOptions={selectedOptions} />
      </div>
    </div>
  );
};

export default FilteredFather;
