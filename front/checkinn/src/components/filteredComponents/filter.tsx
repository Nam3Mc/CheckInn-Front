import React, { useState, useEffect } from "react";

interface FilterProps {
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

const Filter: React.FC<FilterProps> = ({ setSelectedOptions }) => {
  const [tempOptions, setTempOptions] = useState<string[]>(['', '', '', '']);
  const [capacityOptions, setCapacityOptions] = useState<string[]>([]);
  const [bedsOptions, setBedsOptions] = useState<string[]>([]);
  const [bathsOptions, setBathsOptions] = useState<string[]>([]);

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>, dropdownNumber: number) => {
    setTempOptions((prev) => {
      const newOptions = [...prev];
      newOptions[dropdownNumber - 1] = event.target.value;
      return newOptions;
    });
  };

  useEffect(() => {
    const price = tempOptions[0];

    // Update capacity, beds, and baths options based on the selected price
    if (price) {
      setCapacityOptions(getCapacityOptions(price));
      setBedsOptions(getBedsOptions(price));
      setBathsOptions(getBathsOptions(price));
    }
  }, [tempOptions[0]]); // Re-run when price changes

  const getCapacityOptions = (price: string) => {
    // Aquí puedes implementar la lógica que determine las opciones disponibles según el precio
    if (price === "100") return ["1", "2"];
    if (price === "120") return ["2", "3", "4"];
    if (price === "150") return ["3","4"]
    return ["1", "2", "3", "4"];
  };

  const getBedsOptions = (price: string) => {
    if (price === "100") return ["1",];
    if (price === "120") return ["1","2"];
    if (price === "150") return ["2","3","4"]
    return ["1", "2", "3", "4"];
  };

  const getBathsOptions = (price: string) => {
    if (price === "100") return ["1"];
    if (price === "120") return ["1"];
    if (price === "150") return ["1","2"]

    return ["1", "2"];
  };

  const handleApplyFilters = () => {
    setSelectedOptions(tempOptions);
  };

  return (
    <div className="w-[100%] h-full bg-gray-800 rounded-2xl text-white p-4 flex flex-col space-y-4">
      <div className="space-y-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Price</h3>
          <select
            className="bg-gray-600 text-white p-2 rounded-lg w-full"
            onChange={(e) => handleDropdownChange(e, 1)}
            value={tempOptions[0]}
          >
            <option value="">Select price range</option>
            <option value="100">$100</option>
            <option value="120">$120</option>
            <option value="150">$150</option>
          </select>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Capacity</h3>
          <select
            className="bg-gray-600 text-white p-2 rounded-lg w-full"
            onChange={(e) => handleDropdownChange(e, 2)}
            value={tempOptions[1]}
          >
            <option value="">Select capacity</option>
            {capacityOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Beds</h3>
          <select
            className="bg-gray-600 text-white p-2 rounded-lg w-full"
            onChange={(e) => handleDropdownChange(e, 3)}
            value={tempOptions[2]}
          >
            <option value="">Select beds</option>
            {bedsOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Baths</h3>
          <select
            className="bg-gray-600 text-white p-2 rounded-lg w-full"
            onChange={(e) => handleDropdownChange(e, 4)}
            value={tempOptions[3]}
          >
            <option value="">Select baths</option>
            {bathsOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleApplyFilters}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filter;
