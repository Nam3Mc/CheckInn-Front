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
            if (Array.isArray(data)) {
              setReservations(data);
            } else {
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
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
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
            className="bg-white border border-gray-800 rounded-lg overflow-hidden shadow-md mb-6 flex justify-center items-center"
          >
            <div className="p-6 text-center">
              <p className="text-xl font-semibold text-gray-800 mb-2">
                Price: ${res.price}
              </p>
              <p
                className={`text-lg mb-4 font-bold ${
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
              <p className="text-gray-700 font-bold">Guests: {res.guests}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Reservations;
