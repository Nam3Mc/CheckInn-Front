"use client";

import { getReservationsByAccountId } from "@/utils/CRUD/rooms/reservations/getReservatinos";
import React, { useEffect, useState } from "react";

interface Reservation {
  id: string;
  price: number;
  status: string;
  checkin: string;
  checkout: string;
  guests: number;
  hasMinor: boolean;
}

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const userLG: string | null = localStorage.getItem("userDataLogin");
        if (userLG) {
          const { accountId } = JSON.parse(userLG);
          if (accountId) {
            const data = await getReservationsByAccountId(accountId);
            if (Array.isArray(data)) {
              setReservations(data);
            } else {
              console.error("Expected an array but got:", data);
              setReservations([]);
            }
          } else {
            setError("No account ID found.");
          }
        } else {
          setError("No user data found in local storage.");
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setError("Failed to fetch reservations.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

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
        reservations.map((res: Reservation) => (
          <div
            key={res.id}
            className="bg-white border border-gray-800 rounded-lg overflow-hidden shadow-md mb-6 flex flex-col items-center">
            <div className="p-6 text-center">
              <p className="text-xl font-semibold text-gray-800 mb-2">
                Price: ${res.price.toFixed(2)}
              </p>
              <p
                className={`text-lg mb-4 font-bold ${
                  res.status === "confirmed" ? "text-green-600" : "text-red-600"
                }`}>
                Status:{" "}
                {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
              </p>
              <p className="text-gray-700 mb-2">
                Check-in: {new Date(res.checkin).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-2">
                Check-out: {new Date(res.checkout).toLocaleDateString()}
              </p>
              <p className="text-gray-700 font-bold">Guests: {res.guests}</p>
              <p className="text-gray-700">
                Has Minor: {res.hasMinor ? "Yes" : "No"}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Reservations;
