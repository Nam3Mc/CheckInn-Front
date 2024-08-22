import React from "react";
import DetailPics from "./detailPics";
import DetailDescription from "./detailDescription";

const DetailFather = () => {
  return (
    <div className="p-5 w-full h-[90%]  flex gap-5 ">
      <DetailPics></DetailPics>
      {/* componente que renderiza imagenes de la room */}
      <DetailDescription></DetailDescription>
      {/* componente que renderiza la data de la room */}
    </div>
  );
};

export default DetailFather;
