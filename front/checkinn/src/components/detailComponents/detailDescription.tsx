import React, { useState, useEffect } from "react";
import { IRoom } from "@/utils/interfaces/interfaces";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import useMercadoPago from "@/utils/mercadopago/mercadopago";
import axios from "axios";
import CalendarWithBookings from "../calendar/CalendarWithBookings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const DetailDescription = ({ dataDescription }: { dataDescription: IRoom }) => {
  const router = useRouter();
  const { createPaymentPreference } = useMercadoPago();
  const { id, name, description, beds, baths, capacity, price } =
    dataDescription;

  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [accountId, setAccountId] = useState("");
  const [roomId, setRoomId] = useState(dataDescription.id);
  const [guests, setGuests] = useState(0);
  const [hasMinor, setHasMinor] = useState(false);
  const [message, setMessage] = useState("");
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false); // Nuevo estado para visibilidad del calendario
  const [status, setStatus] = useState<string>(""); // Estado para el estado de la habitación

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
  }, [router]);

  const handleDateRangeChange = async (selectedRange: Date[] | null) => {
    if (selectedRange && selectedRange.length === 2) {
      const checkinDate = selectedRange[0].toISOString();
      const checkoutDate = selectedRange[1].toISOString();

      setCheckin(checkinDate);
      setCheckout(checkoutDate);

      // Verificar disponibilidad de la habitación
      try {
        const response = await axios.get<Date[]>(
          `http://localhost:8080/reservations/availability/${roomId}`
        );
        const bookedDates = response.data;

        const isAvailable = !bookedDates.some(
          (date) =>
            date.getTime() >= new Date(selectedRange[0]).getTime() &&
            date.getTime() <= new Date(selectedRange[1]).getTime()
        );

        setStatus(isAvailable ? "Available" : "Not Available");
      } catch (error) {
        console.error("Error checking availability:", error);
        setStatus("Error");
      }
    } else {
      setCheckin("");
      setCheckout("");
      setStatus("Available");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accountId) {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "You must be logged in to book a reservation",
        confirmButtonText: "Aceptar",
      });
      router.push("/login");
      return;
    }

    if (status === "Not Available") {
      Swal.fire({
        icon: "error",
        title: "Unavailable",
        text: "The selected dates are not available.",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    try {
      // Paso 1: Crear la reserva en el backend
      const bookingResponse = await axios.post("http://localhost:8080/reservations", {
        checkinDate: new Date(checkin).toISOString(),
        checkoutDate: new Date(checkout).toISOString(),
        accountId,
        roomId,
        guests: Number(guests),
        hasMinor,
      });

      console.log("Booking Response:", bookingResponse.data);
      const { total: price, reservation } = bookingResponse.data;
      const reservationId = reservation?.id; // Asegúrate de que este campo esté disponible

      if (!price || !reservationId) {
        throw new Error("Error fetching reservation details");
      }

      // Paso 2: Crear la preferencia de pago en MercadoPago
      const initPoint = await createPaymentPreference({
        price: parseFloat(price),
        id: reservationId,
      });

      // Redirigir al usuario a MercadoPago
      router.push(initPoint);
    } catch (error) {
      console.error("Error creating payment preference:", error);
      setMessage("Reservation failed. Please try again.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La reserva falló. Por favor, intenta de nuevo.",
        confirmButtonText: "Aceptar",
      });
    }
  };
  const toggleCalendarVisibility = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  return (
    <div className="flex flex-col w-full max-w-lg h-auto bg-white rounded-2xl shadow-lg p-6 overflow-hidden">
      <h2 className="text-3xl font-bold mb-4 text-center">{name}</h2>

      <p className="text-gray-600 mb-2">Description: {description}</p>
      <p className="text-gray-600 mb-2">Beds: {beds}</p>
      <p className="text-gray-600 mb-2">Baths: {baths}</p>
      <p className="text-gray-600 mb-2">Capacity: {capacity} guests</p>
      <p className="text-gray-600 mb-2">Price: ${price} per night</p>

      <button
        type="button"
        onClick={toggleCalendarVisibility}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-600 transition duration-300 mb-4 flex items-center justify-center space-x-2">
        <FontAwesomeIcon icon={faCalendarAlt} />
        <span>{isCalendarVisible ? "Hide Calendar" : "Show Calendar"}</span>
      </button>

      {isCalendarVisible && (
        <>
          <CalendarWithBookings
            roomId={roomId}
            onDateChange={handleDateRangeChange}
          />
          {checkin && checkout && (
            <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-md">
              <p className="text-lg font-medium text-gray-700">
                Selected Dates:
              </p>
              <p className="text-gray-600">
                Check-in: {new Date(checkin).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                Check-out: {new Date(checkout).toLocaleDateString()}
              </p>
            </div>
          )}
        </>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-4">
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

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="hasMinor"
            checked={hasMinor}
            onChange={(e) => setHasMinor(e.target.checked)}
            className="h-4 w-4 border-gray-300 rounded text-green-600 focus:ring-green-500"
          />
          <label
            htmlFor="hasMinor"
            className="text-lg font-medium text-gray-700">
            Has Minor:
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 px-4 rounded-md shadow-lg hover:bg-green-600 transition duration-300">
          Make Reservation
        </button>

        {message && (
          <div
            className={`mt-4 p-2 text-center text-lg font-semibold ${
              message.includes("successful") ? "text-green-600" : "text-red-600"
            }`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default DetailDescription;
