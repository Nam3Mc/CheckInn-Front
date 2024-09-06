import React, { useState, useEffect } from "react";
import axios from "axios";
import ManualCalendar from "./ManualCalendar";


interface Booking {
  checkin: string;
  checkout: string;
}

interface CalendarWithBookingsProps {
  roomId: string;
  onDateChange: (selectedRange: Date[] | null) => void; // Prop para manejar la selección de fechas
}

const CalendarWithBookings: React.FC<CalendarWithBookingsProps> = ({
  roomId,
  onDateChange,
}) => {
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [selectedRange, setSelectedRange] = useState<Date[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await axios.get<string[]>(`http://localhost:8080/reservations/availability/${roomId}`);
        console.log("API response:", response.data);
        const bookedDatesData: Date[] = response.data.map((dateString: string) => new Date(dateString));
        console.log("Converted dates:", bookedDatesData);
        setBookedDates(bookedDatesData);
      } catch (error) {
        console.error("Error fetching booked dates:", error);
        setError("Error fetching booked dates.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookedDates();
  }, [roomId]);
  
  const isRangeAvailable = (checkin: Date, checkout: Date): boolean => {
    return !bookedDates.some((date:Date) => 
      (date >= checkin && date <= checkout)
    );
  };

  const handleDateSelect = async (selectedDate: Date) => {
    if (!selectedRange) {
      setSelectedRange([selectedDate]);
    } else if (selectedRange.length === 1) {
      const [startDate] = selectedRange;
      const endDate = selectedDate;
  
      const [checkin, checkout] = endDate < startDate ? [endDate, startDate] : [startDate, endDate];
  
      if (isRangeAvailable(checkin, checkout)) {
        setSelectedRange([checkin, checkout]);
        onDateChange([checkin, checkout]);
      } else {
        alert("Selected date range is not available.");
      }
    } else {
      setSelectedRange([selectedDate]);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ManualCalendar
      bookedDates={bookedDates}
      onDateSelect={handleDateSelect}
    />
  );
};

export default CalendarWithBookings;
