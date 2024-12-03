import React, { useState, useEffect, useMemo, useCallback } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./SchedulePage.css";
import scheduleData from '../assets/tournamentData.json'

const SchedulePage = () => {
  const [date, setDate] = useState(new Date());
  const [filters, setFilters] = useState({
    type: "all",
    ageGroup: "all",
    location: "all",
    level: "all",
  });
  const [tournamentData, setTournamentData] = useState([]);
  const [filteredTournaments, setFilteredTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);

  // Restrict the calendar view to the next 3 months
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  useEffect(() => {
    const parsedData = scheduleData.map((tournament) => ({
      ...tournament,
      date: new Date(tournament.date), // Parse the date string into a Date object
    }));
    setTournamentData(parsedData);
    setFilteredTournaments(parsedData);
  }, []);

  useEffect(() => {
    // Apply filters
    setFilteredTournaments(
      tournamentData.filter((tournament) => {
        return (
          (filters.type === "all" || tournament.type === filters.type) &&
          (filters.ageGroup === "all" || tournament.ageGroup === filters.ageGroup) &&
          (filters.location === "all" || tournament.location === filters.location) &&
          (filters.level === "all" || tournament.level === filters.level)
        );
      })
    );
  }, [filters, tournamentData]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDateChange = useCallback((newDate) => {
    setDate(newDate);
  }, []);

  const openTournamentDetails = useCallback((tournament) => {
    setSelectedTournament(tournament);
  }, []);

  const closeTournamentDetails = useCallback(() => {
    setSelectedTournament(null);
  }, []);

  const filteredTournamentsMemo = useMemo(() => {
    return tournamentData.filter((tournament) => {
      return (
        (filters.type === "all" || tournament.type === filters.type) &&
        (filters.ageGroup === "all" || tournament.ageGroup === filters.ageGroup) &&
        (filters.location === "all" || tournament.location === filters.location) &&
        (filters.level === "all" || tournament.level === filters.level)
      );
    });
  }, [filters, tournamentData]);

  useEffect(() => {
    setFilteredTournaments(filteredTournamentsMemo);
  }, [filteredTournamentsMemo]);

  const handleClickOutside = (e) => {
    if (e.target.className === 'modal') {
      closeTournamentDetails();
    }
  };
  
  return (
    <div className="schedule-page">
      <header>
        <h1>Volleyball Tournaments</h1>
      </header>
      <div className="layout">
        <aside className="sidebar">
          <h3>Filters</h3>
          <div>
            <label htmlFor="type">Tournament Type:</label>
            <select
              id="type"
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="regional">Regional</option>
              <option value="national">National</option>
              <option value="friendly">Friendly</option>
            </select>
          </div>

          <div>
            <label htmlFor="ageGroup">Age Group:</label>
            <select
              id="ageGroup"
              name="ageGroup"
              value={filters.ageGroup}
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="u12">Under 12</option>
              <option value="u18">Under 18</option>
              <option value="open">Open</option>
            </select>
          </div>

          <div>
            <label htmlFor="location">Location:</label>
            <select
              id="location"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="indoor">Indoor</option>
              <option value="beach">Beach</option>
            </select>
          </div>

          <div>
            <label htmlFor="level">Tournament Level:</label>
            <select
              id="level"
              name="level"
              value={filters.level}
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </aside>

        <main className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={date}
            minDetail="month"
            maxDate={maxDate}
            tileContent={({ date, view }) => {
              if (view === "month") {
                const dayTournaments = filteredTournaments.filter(
                  (tournament) =>
                    tournament.date.toDateString() === date.toDateString()
                );
                return (
                  <ul className="event-list">
                    {dayTournaments.map((tournament, index) => (
                      <li
                        key={index}
                        className={`event-${tournament.type}`}
                        onClick={() => openTournamentDetails(tournament)}
                      >
                        {tournament.name}
                      </li>
                    ))}
                  </ul>
                );
              }
              return null;
            }}
          />
        </main>
      </div>
      {selectedTournament && (
        <div className="modal" onClick={handleClickOutside}>
          <div className="modal-content">
            <h3>{selectedTournament.name}</h3>
            <p>
              <strong>Date:</strong> {selectedTournament.date.toLocaleDateString()}
            </p>
            <p>
              <strong>Type:</strong> {selectedTournament.type}
            </p>
            <p>
              <strong>Age Group:</strong> {selectedTournament.ageGroup}
            </p>
            <p>
              <strong>Location:</strong> {selectedTournament.location}
            </p>
            <p>
              <strong>Level:</strong> {selectedTournament.level}
            </p>
            <button onClick={closeTournamentDetails}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;