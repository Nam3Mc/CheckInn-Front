"use client";
import React, { useState, useEffect } from "react";
import { IRoom } from "@/utils/interfaces/interfaces";
import { postReservations } from "@/utils/CRUD/rooms/reservations/postReservations";

const DetailDescription = ({ dataDescription }: { dataDescription: IRoom }) => {
  const { id, name, description, beds, baths, capacity, price, status } =
    dataDescription;

  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [accountId, setAccountId] = useState("");
  const [roomId, setRoomId] = useState(dataDescription.id);
  const [nights, setNights] = useState(0);
  const [guests, setGuests] = useState(0);

  // Usar useEffect para cargar el accountId desde localStorage
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
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Crear el objeto con los datos del formulario
    const bookingData = {
      checkin: new Date(checkin).toISOString(),
      checkout: new Date(checkout).toISOString(),
      accountId,
      roomId,
      nights: Number(nights),
      guests: Number(guests),
    };

    console.log("Booking Data:", bookingData);

    const response = await postReservations(bookingData);
    // Aquí podrías enviar este objeto a tu API o manejarlo según sea necesario
    alert(response.data);
  };

  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{name}</h2>
      <p className="text-gray-700 mb-2">ID: {id}</p>
      <p className="text-gray-700 mb-2">Description: {description}</p>
      <p className="text-gray-700 mb-2">Beds: {beds}</p>
      <p className="text-gray-700 mb-2">Baths: {baths}</p>
      <p className="text-gray-700 mb-2">Capacity: {capacity} guests</p>
      <p className="text-gray-700 mb-2">Price: ${price} per night</p>
      <p
        className={`text-lg font-semibold ${
          status === "available" ? "text-green-500" : "text-red-500"
        }`}
      >
        Status: {status === "available" ? "Available" : "Not Available"}
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="checkin">Check-in:</label>
          <input
            type="datetime-local"
            id="checkin"
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="checkout">Check-out:</label>
          <input
            type="datetime-local"
            id="checkout"
            value={checkout}
            onChange={(e) => setCheckout(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="accountId">Account ID:</label>
          <input
            type="text"
            id="accountId"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="roomId">Room ID:</label>
          <input
            type="text"
            id="roomId"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="nights">Nights:</label>
          <input
            type="number"
            id="nights"
            value={nights}
            onChange={(e) => setNights(Number(e.target.value))}
            required
            min={1}
          />
        </div>

        <div>
          <label htmlFor="guests">Guests:</label>
          <input
            type="number"
            id="guests"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            required
            min={1}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DetailDescription;
