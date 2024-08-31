// components/CalendarWithBookings.tsx
"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './CalendarWithBookings.module.css';

interface Booking {
  checkin: string;
  checkout: string;
}

interface CalendarWithBookingsProps {
  roomId: string;
}

const CalendarWithBookings: React.FC<CalendarWithBookingsProps> = ({ roomId }) => {
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [selectedRange, setSelectedRange] = useState<Date[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/rooms/availability/${roomId}`);
        const data: Booking[] = response.data;

        const allBookedDates: Date[] = [];

        data.forEach((range) => {
          const checkinDate = new Date(range.checkin);
          const checkoutDate = new Date(range.checkout);

          let currentDate = checkinDate;
          while (currentDate <= checkoutDate) {
            allBookedDates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }
        });

        setBookedDates(allBookedDates);
        setLoading(false);
      } catch (error) {
        setError('Error al obtener los datos');
        setLoading(false);
      }
    };

    fetchData();
  }, [roomId]);

  const tileClassName = ({ date }: { date: Date }) => {
    const formattedDate = date.toISOString().split('T')[0];
    return bookedDates.some(d => d.toISOString().split('T')[0] === formattedDate)
      ? styles.booked
      : undefined;
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    const formattedDate = date.toISOString().split('T')[0];
    return bookedDates.some(d => d.toISOString().split('T')[0] === formattedDate);
  };

  const handleDateChange = (range: Date[]) => {
    if (range.length === 2) {
      setSelectedRange(range);
    } else {
      setSelectedRange(null);
    }
  };

  const handleSave = () => {
    if (selectedRange && selectedRange.length === 2) {
      // Aquí puedes enviar `selectedRange` a tu backend o hacer lo que necesites con las fechas seleccionadas
      console.log('Fechas seleccionadas para reserva:', selectedRange);
    } else {
      alert('Selecciona un rango de fechas válido.');
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Calendario de Reservas</h1>
      <Calendar
        selectRange
        onChange={handleDateChange}
        tileClassName={tileClassName}
        tileDisabled={tileDisabled}
        // Puedes pasar otras props aquí si lo necesitas
      />
      {selectedRange && selectedRange.length === 2 && (
        <div>
          <h2>Rango Seleccionado:</h2>
          <p>Check-in: {selectedRange[0].toDateString()}</p>
          <p>Check-out: {selectedRange[1].toDateString()}</p>
          <button onClick={handleSave}>Guardar Reserva</button>
        </div>
      )}
    </div>
  );
};

export default CalendarWithBookings;
