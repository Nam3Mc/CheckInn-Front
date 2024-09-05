import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Room {
  id: string;
  name: string;
  description: string;
  beds: number;
  baths: number;
  photos: string;
  capacity: number;
  price: number;
}

interface ProductCardProps {
  selectedOptions: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({ selectedOptions }) => {
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Room[]>(
          "http://localhost:8080/rooms/filter",
          {
            params: {
              price: selectedOptions[0] || undefined,
              capacity: selectedOptions[1] || undefined,
              beds: selectedOptions[2] || undefined,
              baths: selectedOptions[3] || undefined,
            },
          }
        );

        setFilteredRooms(response.data);
      } catch (error: any) {
        console.error("Error fetching rooms:", error);
        setError("Error fetching rooms. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (selectedOptions.length > 0) {
      fetchData();
    } else {
      setFilteredRooms([]);
    }
  }, [selectedOptions]);

  const handlerEvent = (id: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("room", String(id));
      router.push(`/rooms/${id}`);
    }
  };

  return (
    <div className="w-full h-full flex flex-wrap gap-4 p-4">
      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && filteredRooms.length === 0 && (
        <p className="text-white">No results found.</p>
      )}
      {filteredRooms.map((room) => (
        <div
          key={room.id}
          className="w-full md:w-1/3 h-auto bg-gray-700 rounded-2xl text-white p-4 mb-4 transition-transform transform hover:scale-105 flex flex-col"
          style={{ boxShadow: " 4px 6px 6px rgba(166, 187, 255, 0.3)" }}
          onClick={() => handlerEvent(room.id)}>
          <img
            src={room.photos}
            alt={room.name}
            className="w-full h-40 rounded-t-lg object-cover mb-4"
          />
          <div className="flex flex-col items-start">
            <h2 className="text-xl font-bold mb-2">{room.name}</h2>
            <p>{room.description}</p>
            <p>Beds: {room.beds}</p>
            <p>Baths: {room.baths}</p>
            <p>Capacity: {room.capacity}</p>
            <p>Price: ${room.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
