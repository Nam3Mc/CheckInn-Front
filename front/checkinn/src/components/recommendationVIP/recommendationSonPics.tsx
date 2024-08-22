import { IimgVIP } from "@/utils/interfaces/interfaces";
import React from "react";

export const RecommendationSonPic = ({ imgVIP }: { imgVIP: IimgVIP }) => {
  if (!imgVIP) {
    return null;
  }
  const { img1, img2, img3, img4 } = imgVIP;
  return (
    <div className=" w-full h-full bg-orchid rounded-2xl ">
      RecommendationSonPic
      <p>{img1}</p>
      <p>{img2}</p>
    </div>
  );
};
export default RecommendationSonPic;
