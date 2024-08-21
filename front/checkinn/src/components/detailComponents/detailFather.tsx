import React from "react";
import DetailPics from "./detailPics";
import DetailDescription from "./detailDescription";

const DetailFather = () => {
  return (
    <div className="p-5 w-full h-[90%]  flex gap-5 ">
      <DetailPics></DetailPics>
      <DetailDescription></DetailDescription>
    </div>
  );
};

export default DetailFather;
