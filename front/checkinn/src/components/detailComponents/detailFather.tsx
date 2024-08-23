import React from "react";
import DetailPics from "./detailPics";
import DetailDescription from "./detailDescription";
import { IRoom } from "@/utils/interfaces/interfaces";

const DetailFather = ({ data }: { data: IRoom }) => {
  return (
    <div className="p-5 w-full h-[90%] flex gap-5">
      <DetailPics dataIMG={data.photos} />
      <DetailDescription dataDescription={data} />
    </div>
  );
};

export default DetailFather;
