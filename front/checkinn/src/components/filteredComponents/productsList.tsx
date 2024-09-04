import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProductsListProps {
  selectedOptions: string[];
}

const ProductsList: React.FC<ProductsListProps> = ({ selectedOptions }) => {
  const [filteredRooms, setFilteredRooms] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/rooms/filter", {
          params: {
            price: selectedOptions[0],
            capacity: selectedOptions[1],
            beds: selectedOptions[2],
            baths: selectedOptions[3],
          },
        });

        if (Array.isArray(response.data)) {
          setFilteredRooms(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    if (selectedOptions.length > 0) {
      fetchData();
    }
  }, [selectedOptions]);

  return (
    <div>
      {filteredRooms.map((room) => (
        <div
          key={room.id}
          className="w-[40%] h-[80%] bg-gray-700 rounded-2xl text-white flex items-center justify-center transition-transform transform hover:scale-105 p-4 mb-4">
          <div>
            <h2 className="text-xl font-bold">{room.name}</h2>
            <p>{room.description}</p>
            <p>Beds: {room.beds}</p>
            <p>Baths: {room.baths}</p>
            <p>Capacity: {room.capacity}</p>
            <p>Price: ${room.price}</p>
          </div>
          <Image
            src={room.photos}
            alt={room.name}
            width={80} // w-20 es 80 píxeles
            height={80} // h-20 es 80 píxeles
            className="ml-4 rounded-lg"
            layout="fixed" // Para mantener el tamaño exacto
          />
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
