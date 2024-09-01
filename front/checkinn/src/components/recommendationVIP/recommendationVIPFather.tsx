import React from "react";
import RecommendationSonPics from "./recommendationSonPics";
import RecommendationSonDescription from "./recommendationSonDescription";
import { arrayVIP1 } from "@/utils/arrays/arrayVIP1";
import { IDataVIP } from "@/utils/interfaces/interfaces";
const RecommendationVIPFather = () => {
  return (
    <div className="mt-5 w-full h-[90%] ">
      {arrayVIP1.map((vip: IDataVIP) => (
        <div className=" w-full h-full   flex gap-5  " key={Math.random()}>
         
          <RecommendationSonPics imgVIP={vip.imgVIP}></RecommendationSonPics>
          {/* <RecommendationSonDescription
            descriptionVIP={vip.descriptionVIP}
          ></RecommendationSonDescription> */}
        </div>
      ))}
    </div>
  );
};

export default RecommendationVIPFather;