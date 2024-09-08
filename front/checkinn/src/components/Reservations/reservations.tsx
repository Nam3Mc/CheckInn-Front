"use client";

import { getReservationsByAccountId } from "@/utils/CRUD/rooms/reservations/getReservatinos";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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

  const cancelReservation = async (reservationId: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel your reservation?"
    );

    if (!isConfirmed) return;

    try {
      const response = await fetch(
        `http://localhost:8080/reservations/${reservationId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Agrega cualquier header adicional necesario, como Authorization
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel the reservation");
      }

      alert("Your reservation has been successfully cancelled.");
      // Elimina la reserva cancelada del estado para actualizar la UI
      setReservations(reservations.filter((res) => res.id !== reservationId));
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      alert(
        "An error occurred while cancelling your reservation. Please try again."
      );
    }
  };

  const completePayment = async (
    reservationId: string,
    price: number,
    description: string
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8080/mercadopago/complete-payment/${reservationId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transaction_amount: price,
            description: description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to complete the payment");
      }

      const { init_point } = await response.json();
      if (init_point) {
        // Redirige al usuario a la página de pago de MercadoPago
        window.location.href = init_point;
      } else {
        throw new Error("Payment URL not received");
      }
    } catch (error) {
      console.error("Error completing payment:", error);
      alert(
        "An error occurred while completing the payment. Please try again."
      );
    }
  };

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
            className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow-lg mb-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="p-6 w-full text-center bg-gradient-to-r from-blue-50 to-green-50">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Reservation Details
              </h3>
              <div className="flex flex-col items-center space-y-2">
                <p className="text-xl font-semibold text-gray-900">
                  Price:{" "}
                  <span className="text-green-600">
                    ${res.price.toFixed(2)}
                  </span>
                </p>
                <p className="text-lg font-bold text-gray-700">
                  Status:{" "}
                  <span
                    className={`${
                      res.status === "paid"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}>
                    {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                  </span>
                </p>
                <div className="flex justify-between w-full max-w-xs text-gray-700 mt-4">
                  <p className="flex-1">
                    <span className="font-medium">Check-in:</span>{" "}
                    {new Date(res.checkin).toLocaleDateString()}
                  </p>
                  <p className="flex-1">
                    <span className="font-medium">Check-out:</span>{" "}
                    {new Date(res.checkout).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-gray-700 font-semibold mt-2">
                  Guests: <span className="text-gray-900">{res.guests}</span>
                </p>
                <p className="text-gray-700">
                  Has Minor:{" "}
                  <span className="text-gray-700 font-medium">
                    {res.hasMinor ? "Yes" : "No"}
                  </span>
                </p>

                {res.status === "pending" && (
                  <button
                    onClick={() => completePayment(res.id, res.price, 'Payment for reservation')}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                    Complete Payment
                  </button>
                )}
                <button
                  onClick={() => cancelReservation(res.id)}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                  Cancel Reservation
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Reservations;
