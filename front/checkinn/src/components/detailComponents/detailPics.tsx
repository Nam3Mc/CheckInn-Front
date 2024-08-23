import Image from "next/image";
import React from "react";

const DetailPics = ({ dataIMG }: { dataIMG: string }) => {
  return (
    <div className="w-[95%] h-full bg-orchid rounded-2xl">
      <img
        src={dataIMG}
        width={600}
        height={600}
        alt="Room Image"
        className="rounded-md"
      />
    </div>
  );
};

export default DetailPics;
