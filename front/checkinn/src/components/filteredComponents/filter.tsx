import { getRooms } from "@/utils/CRUD/rooms/getRooms";
import React, { useState, useEffect } from "react";


interface FilterProps {
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

const Filter: React.FC<FilterProps> = ({ setSelectedOptions }) => {
  const [roomsData, setRoomsData] = useState<any[]>([]); // Ajusta el tipo según la estructura de tus datos
  const [tempOptions, setTempOptions] = useState<string[]>(['', '', '', '']);
  const [capacityOptions, setCapacityOptions] = useState<string[]>([]);
  const [bedsOptions, setBedsOptions] = useState<string[]>([]);
  const [bathsOptions, setBathsOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const data = await getRooms();
      if (data) {
        setRoomsData(data);
      }
    };
    fetchRooms();
  }, []);

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
    const capacities = roomsData
      .filter(room => room.price.toString() === price)
      .map(room => room.capacity.toString());
    return Array.from(new Set(capacities)); // Remove duplicates
  };

  const getBedsOptions = (price: string) => {
    const beds = roomsData
      .filter(room => room.price.toString() === price)
      .map(room => room.beds.toString());
    return Array.from(new Set(beds)); // Remove duplicates
  };

  const getBathsOptions = (price: string) => {
    const baths = roomsData
      .filter(room => room.price.toString() === price)
      .map(room => room.baths.toString());
    return Array.from(new Set(baths)); // Remove duplicates
  };

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>, dropdownNumber: number) => {
    setTempOptions((prev) => {
      const newOptions = [...prev];
      newOptions[dropdownNumber - 1] = event.target.value;
      return newOptions;
    });
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
            {Array.from(new Set(roomsData.map(room => room.price.toString()))).map(price => (
              <option key={price} value={price}>${price}</option>
            ))}
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
