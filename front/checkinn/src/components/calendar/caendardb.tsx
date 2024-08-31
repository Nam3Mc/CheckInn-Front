'use client';

import React, { useState, useEffect } from 'react';
import styles from './ManualCalendar.module.css';

interface ManualCalendarProps {
  bookedDates: Date[];
}

const ManualCalendar: React.FC<ManualCalendarProps> = ({ bookedDates }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState<Date[]>([]);

  useEffect(() => {
    generateCalendar(currentDate);
  }, [currentDate]);

  const generateCalendar = (date: Date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const daysArray = [];
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      daysArray.push(new Date(date.getFullYear(), date.getMonth(), i));
    }
    setDays(daysArray);
  };

  const isBooked = (day: Date) => {
    return bookedDates.some(
      bookedDate =>
        bookedDate.getDate() === day.getDate() &&
        bookedDate.getMonth() === day.getMonth() &&
        bookedDate.getFullYear() === day.getFullYear()
    );
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.header}>
        <button onClick={handlePrevMonth}>Prev</button>
        <span>
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </span>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <div className={styles.daysContainer}>
        {days.map((day, index) => (
          <div
            key={index}
            className={`${styles.day} ${isBooked(day) ? styles.booked : ''}`}
            onClick={() => !isBooked(day) && alert(`Selected date: ${day.toDateString()}`)}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManualCalendar;
