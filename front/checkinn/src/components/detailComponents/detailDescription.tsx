"use client";
import React, { useState, useEffect } from "react";
import { IRoom } from "@/utils/interfaces/interfaces";
import { postReservations } from "@/utils/CRUD/rooms/reservations/postReservations";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const DetailDescription = ({ dataDescription }: { dataDescription: IRoom }) => {
  const router = useRouter();
  const { id, name, description, beds, baths, capacity, price, status } =
    dataDescription;

  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [accountId, setAccountId] = useState("");
  const [roomId, setRoomId] = useState(dataDescription.id);
  const [nights, setNights] = useState(0);
  const [guests, setGuests] = useState(0);
  const [message, setMessage] = useState(""); // Message for success or error

  // Load accountId from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("userDataLogin");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        if (parsedData.accountId) {
          setAccountId(parsedData.accountId);
        } else {
          console.error("Account ID not found in userDataLogin.");
        }
      } catch (error) {
        console.error("Error parsing userDataLogin:", error);
      }
    } else {
      console.error("userDataLogin not found in localStorage.");
      Swal.fire({
        icon: "warning",
        title: "Oops",
        text: "Debes estar logueado para realizar una reserva.",
        confirmButtonText: "Aceptar",
      });
      router.push("/login");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accountId) {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "Debes estar logueado para realizar una reserva.",
        confirmButtonText: "Aceptar",
      });
      router.push("/login");
      return;
    }

    // Create the booking data object
    const bookingData = {
      checkin: new Date(checkin).toISOString(),
      checkout: new Date(checkout).toISOString(),
      accountId,
      roomId,
      nights: Number(nights),
      guests: Number(guests),
    };

    console.log("Booking Data:", bookingData);

    try {
      const response = await postReservations(bookingData);
      setMessage("Reservation successful!");
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "¡Reserva realizada con éxito!",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.error("Error making reservation:", error);
      setMessage("Reservation failed. Please try again.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La reserva falló. Por favor, intenta de nuevo.",
        confirmButtonText: "Aceptar",
      });
    }
  };
  return (
    <div className="flex flex-col w-full max-w-lg h-auto bg-white rounded-2xl shadow-lg p-6 overflow-hidden">
      <h2 className="text-3xl font-bold mb-4 text-center">{name}</h2>

      <p className="text-gray-600 mb-2">Description: {description}</p>

      <p className="text-gray-600 mb-2">Beds: {beds}</p>
      <p className="text-gray-600 mb-2">Baths: {baths}</p>
      <p className="text-gray-600 mb-2">Capacity: {capacity} guests</p>
      <p className="text-gray-600 mb-2">Price: ${price} per night</p>
      <p
        className={`text-lg font-semibold ${
          status === "available" ? "text-green-500" : "text-red-500"
        }`}
      >
        Status: {status === "available" ? "Available" : "Not Available"}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="checkin"
            className="text-lg font-medium text-gray-700"
          >
            Check-in:
          </label>
          <input
            type="datetime-local"
            id="checkin"
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="checkout"
            className="text-lg font-medium text-gray-700"
          >
            Check-out:
          </label>
          <input
            type="datetime-local"
            id="checkout"
            value={checkout}
            onChange={(e) => setCheckout(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="nights" className="text-lg font-medium text-gray-700">
            Nights:
          </label>
          <input
            type="number"
            id="nights"
            value={nights}
            onChange={(e) => setNights(Number(e.target.value))}
            required
            min={1}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="guests" className="text-lg font-medium text-gray-700">
            Guests:
          </label>
          <input
            type="number"
            id="guests"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            required
            min={1}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 px-4 rounded-md shadow-lg hover:bg-green-600 transition duration-300"
        >
          Make Reservation
        </button>

        {message && (
          <div
            className={`mt-4 p-2 text-center text-lg font-semibold ${
              message.includes("successful") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default DetailDescription;
