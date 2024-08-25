"use client";
import { getReservationsByAccountId } from "@/utils/CRUD/rooms/reservations/getReservatinos";
import React, { useEffect, useState } from "react";

const Reservations = () => {
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const userLG: any = localStorage.getItem("userDataLogin");
        if (userLG) {
          const { accountId } = JSON.parse(userLG);
          if (accountId) {
            const data = await getReservationsByAccountId(accountId);
            // La data recibida es un objeto con una propiedad `reservation_` que es un array
            if (Array.isArray(data)) {
              setReservations(data);
            } else {
              // Si `data` es un objeto, extrae `reservation_`
              if (data && Array.isArray(data.reservation_)) {
                setReservations(data.reservation_);
              } else {
                console.error("Expected an array but got:", data);
                setReservations([]);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setReservations([]);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Reservations
      </h1>
      {reservations.length === 0 ? (
        <p className="text-lg text-center text-gray-600">
          No reservations found.
        </p>
      ) : (
        reservations.map((res: any) => (
          <div
            key={res.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md mb-6 flex"
          >
            {/* 
            <img
              src="default-photo-url.jpg"
              alt="User photo"
              className="w-48 h-48 object-cover border-r border-gray-200"
            /> */}
            <div className="p-6 flex-1">
              <p className="text-xl font-semibold text-gray-800 mb-2">
                Price: ${res.price}
              </p>
              <p
                className={`text-lg mb-2 ${
                  res.status ? "text-green-600" : "text-red-600"
                }`}
              >
                Status: {res.status ? "Confirmed" : "Pending"}
              </p>
              <p className="text-gray-700 mb-2">
                Check-in: {new Date(res.checkin).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-2">
                Check-out: {new Date(res.checkout).toLocaleDateString()}
              </p>
              <p className="text-gray-700">Guests: {res.guests}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Reservations;
