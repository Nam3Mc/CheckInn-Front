import { IDescriptionVIP } from "@/utils/interfaces/interfaces";
import React from "react";

const RecommendationSonDescription = ({
  descriptionVIP,
}: {
  descriptionVIP: IDescriptionVIP;
}) => {
  if (!descriptionVIP) {
    return null;
  }

  const { name, description, beds, baths, photos, capacity, price } =
    descriptionVIP;
  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-lg">
      RecommendationSonDescription
      <p> {name}</p>
      <p>{description}</p>
      <p> {beds}</p>
      <p> {baths}</p>
      <p> {photos}</p>
      <p> {capacity}</p>
      <p> {price}</p>
    </div>
  );
};

export default RecommendationSonDescription;
