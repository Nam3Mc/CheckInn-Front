// components/Page.tsx
"use client";

import CalendarWithBookings from "@/components/calendar/availability";
import DetailFather from "@/components/detailComponents/detailFather";
import { getRoomsByID } from "@/utils/CRUD/rooms/getRooms";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: { name: string } }) => {
  const [detailRoom, setDetailRoom] = useState<any>();

  useEffect(() => {
    const LSroom = localStorage.getItem("room");

    if (LSroom) {
      try {
        const roomId = LSroom; // Aquí no necesitas desestructuración
        console.log("Fetching room with ID:", roomId);

        const fetchRoomByID = async () => {
          try {
            const roomsData = await getRoomsByID(roomId); // Pasar roomId directamente
            if (roomsData) {
              console.log("Fetched room data:", roomsData);
              setDetailRoom(roomsData);
            }
          } catch (error) {
            console.error("Error fetching room data:", error);
          }
        };

        fetchRoomByID();
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
      }
    }
  }, []);

  return (
    <div className="h-screen">
      {detailRoom ? (
        <div>
          <DetailFather data={detailRoom} />
          <CalendarWithBookings roomId={detailRoom.id} />
        </div>
      ) : (
        <p>Loading room details...</p>
      )}
    </div>
  );
};

export default Page;
