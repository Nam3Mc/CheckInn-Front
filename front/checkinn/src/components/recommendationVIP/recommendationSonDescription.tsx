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
    <div className="w-full h-full  bg-white rounded-2xl shadow-lg flex flex-col justify-between">
      <div className="flex-grow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{name}</h2>
        <p className="text-gray-600 mb-6">{description}</p>

        <div className="grid grid-cols-2 gap-4 ">
          <div>
            <p className="font-semibold text-gray-700">Beds:</p>
            <p className="text-gray-600">{beds}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Baths:</p>
            <p className="text-gray-600">{baths}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Capacity:</p>
            <p className="text-gray-600">{capacity}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6 p-6">
        <p className="text-lg font-bold text-indigo-600">${price}</p>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default RecommendationSonDescription;
