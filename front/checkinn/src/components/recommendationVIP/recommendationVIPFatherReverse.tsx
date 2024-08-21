import React from "react";
import RecommendationSonPics from "./recommendationSonPics";
import RecommendationSonDescription from "./recommendationSonDescription";

const RecommendationVIPFatherReverse = () => {
  return (
    <div className="mt-5 w-full h-[90%]  flex gap-5 ">
      <RecommendationSonDescription></RecommendationSonDescription>
      <RecommendationSonPics></RecommendationSonPics>
    </div>
  );
};

export default RecommendationVIPFatherReverse;
