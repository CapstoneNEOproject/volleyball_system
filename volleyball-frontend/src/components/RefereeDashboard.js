import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import "./RefereeDashboard.css"; // Custom CSS for styling

const RefereeDashboard = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const gamesPerPage = 10;

  useEffect(() => {
    const fetchRefereeData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/analytics/referee/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching referee analytics:", error);
        setError("Unable to fetch referee analytics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRefereeData();
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

  if (error) {
    return <p>{error}</p>;
  }

  if (games.length === 0) {
    return <p>No recent games found.</p>;
  }

  // Filter games based on results (all, draws, wins)
  const filteredGames = games.filter((game) =>
    filter === "all" ? true : filter === "draws" ? game.draw : !game.draw
  );

  // Pagination logic
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

  return (
    <div className="referee-dashboard">
      <h2>Referee Dashboard</h2>
      <h3>Your Recent Games</h3>

      {/* Filter Dropdown */}
      <div className="filter-container">
        <label>
          Filter:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="draws">Draws</option>
            <option value="wins">Wins</option>
          </select>
        </label>
      </div>

      {/* Games Table */}
      <table className="games-table">
        <thead>
          <tr>
            <th>Game</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {currentGames.map((game) => (
            <tr key={game.id}>
              <td>{game.game}</td>
              <td>{game.draw ? "Draw" : `${game.winning_team} won`}</td>
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

export default RefereeDashboard;
