import React from 'react';
import Calendar from 'react-calendar'; // Asegúrate de que este nombre coincida con el export de tu biblioteca
import 'react-calendar/dist/Calendar.css'; // Importa los estilos si es necesario
import styles from './calendar.module.css'; // Asegúrate de que este archivo exista

interface ManualCalendarProps {
  bookedDates: Date[];
  onDateSelect: (selectedDate: Date) => void; // Añade esta prop
}

const ManualCalendar: React.FC<ManualCalendarProps> = ({ bookedDates, onDateSelect }) => {
  const tileClassName = ({ date }: { date: Date }) => {
    const isBooked = bookedDates.some(bookedDate =>
      bookedDate.toDateString() === date.toDateString()
    );
    return isBooked ? styles.bookedDate : styles.availableDate; // Usa las clases del CSS módulo
  };

  return (
    <Calendar
      tileClassName={tileClassName}
      onClickDay={onDateSelect}
    />
  );
};

export default ManualCalendar;
