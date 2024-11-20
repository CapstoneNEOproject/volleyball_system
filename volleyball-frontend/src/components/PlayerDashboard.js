import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import "./PlayerDashboard.css"; // Add custom styles here

const PlayerDashboard = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const matchesPerPage = 10;

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/analytics/player/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setMatches(response.data);
      } catch (error) {
        console.error("Error fetching player analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, []);

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <ClipLoader size={50} color={"#123abc"} />
      </div>
    );
  }

  if (matches.length === 0) {
    return <p>No recent matches found.</p>;
  }

  // Filtering matches based on attendance
  const filteredMatches = matches.filter((match) =>
    filter === "all" ? true : match.attended === (filter === "attended")
  );

  // Pagination logic
  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = filteredMatches.slice(
    indexOfFirstMatch,
    indexOfLastMatch
  );
  const totalPages = Math.ceil(filteredMatches.length / matchesPerPage);

  return (
    <div className="player-dashboard">
      <h2>Player Dashboard</h2>
      <h3>Your Recent Matches</h3>

      {/* Filter Dropdown */}
      <div className="filter-container">
        <label>
          Filter:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="attended">Attended</option>
            <option value="missed">Missed</option>
          </select>
        </label>
      </div>

      {/* Matches Table */}
      <table className="matches-table">
        <thead>
          <tr>
            <th>Game</th>
            <th>Attended</th>
          </tr>
        </thead>
        <tbody>
          {currentMatches.map((match) => (
            <tr key={match.id}>
              <td>{match.game}</td>
              <td>{match.attended ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination-container">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`pagination-button ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlayerDashboard;
