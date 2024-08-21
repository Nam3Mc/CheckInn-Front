import React from "react";
import RecommendationSonPics from "./recommendationSonPics";
import RecommendationSonDescription from "./recommendationSonDescription";

const RecommendationVIPFather = () => {
  return (
    <div className=" w-full h-[90%]  flex gap-5 ">
      <RecommendationSonPics></RecommendationSonPics>
      <RecommendationSonDescription></RecommendationSonDescription>
    </div>
  );
};

export default RecommendationVIPFather;
