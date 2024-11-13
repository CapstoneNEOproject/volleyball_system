import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const SchedulePage = () => {
  const [date, setDate] = useState(new Date());

  // Restrict the calendar view to the next 3 months
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div>
      <h2>Schedule for the Next 3 Months</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
        minDetail="month"
        maxDate={maxDate}
        tileContent={({ date, view }) => {
          // Placeholder for game data logic
          return <div>{/* Add game info here if available */}</div>;
        }}
      />
    </div>
  );
};

export default SchedulePage;
