"use client";

import React, { useState } from "react";

const Filter = () => {
  const [selectedOption1, setSelectedOption1] = useState<string | null>(null);
  const [selectedOption2, setSelectedOption2] = useState<string | null>(null);
  const [selectedOption3, setSelectedOption3] = useState<string | null>(null);
  const [selectedOption4, setSelectedOption4] = useState<string | null>(null);
  const [selectedOption5, setSelectedOption5] = useState<string | null>(null);

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>, dropdownNumber: number) => {
    switch (dropdownNumber) {
      case 1:
        setSelectedOption1(event.target.value);
        break;
      case 2:
        setSelectedOption2(event.target.value);
        break;
      case 3:
        setSelectedOption3(event.target.value);
        break;
      case 4:
        setSelectedOption4(event.target.value);
        break;
      case 5:
        setSelectedOption5(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-[33%] h-full bg-gray-600 rounded-2xl text-white p-4 flex flex-col space-y-4">
      <div className="space-y-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Price</h3>
          <select
            className="bg-gray-600 text-white p-2 rounded-lg w-full"
            value={selectedOption1 || ""}
            onChange={(e) => handleDropdownChange(e, 1)}
          >
         
            <option value="option1">$ 50 - 100</option>
            <option value="option2">$ 100 - 150</option>
            <option value="option3">$ 200 - 250</option>
            <option value="option4">$ 250 -300</option>
            <option value="option5">Option 5</option>
          </select>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Capacity</h3>
          <select
            className="bg-gray-600 text-white p-2 rounded-lg w-full"
            value={selectedOption2 || ""}
            onChange={(e) => handleDropdownChange(e, 2)}
          >
           
            <option value="option1">1</option>
            <option value="option2">2</option>
            <option value="option3">3</option>
            <option value="option4">4</option>
            <option value="option5">5</option>
          </select>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Beds</h3>
          <select
            className="bg-gray-600 text-white p-2 rounded-lg w-full"
            value={selectedOption3 || ""}
            onChange={(e) => handleDropdownChange(e, 3)}
          >
           
            <option value="option1">1</option>
            <option value="option2">2</option>
            <option value="option3">3</option>
            <option value="option4">4</option>
           
          </select>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Bathrooms</h3>
          <select
            className="bg-gray-600 text-white p-2 rounded-lg w-full"
            value={selectedOption4 || ""}
            onChange={(e) => handleDropdownChange(e, 4)}
          >
           
            <option value="option1">1</option>
            <option value="option2">2</option>
          
          </select>
        </div>
        
      </div>
    </div>
  );
};

export default Filter;
