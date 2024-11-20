import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/analytics/admin/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAnalytics(response.data);
      } catch (err) {
        console.error("Error fetching admin analytics:", err);
        setError("Failed to load analytics data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
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

  if (!analytics) {
    return <p>No analytics data available.</p>;
  }

  // Filtered data
  const filteredTeams = analytics.teams.filter((team) =>
    team.team.toLowerCase().includes(filter.toLowerCase())
  );

  // Pagination logic for teams
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentTeams = filteredTeams.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredTeams.length / rowsPerPage);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <h3>Team Analytics</h3>

      {/* Search filter */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by team name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <table className="analytics-table">
        <thead>
          <tr>
            <th>Team</th>
            <th>Total Games</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Win Percentage</th>
            <th>Attendance Count</th>
          </tr>
        </thead>
        <tbody>
          {currentTeams.map((team) => (
            <tr key={team.team}>
              <td>{team.team}</td>
              <td>{team.total_games}</td>
              <td>{team.wins}</td>
              <td>{team.losses}</td>
              <td>{team.win_percentage.toFixed(2)}%</td>
              <td>{team.attendance_count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination for teams */}
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

      <h3>Referee Analytics</h3>
      <table className="analytics-table">
        <thead>
          <tr>
            <th>Referee</th>
            <th>Games Officiated</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {analytics.referees.map((referee) => (
            <tr key={referee.referee}>
              <td>{referee.referee}</td>
              <td>{referee.games_officiated}</td>
              <td>{referee.attendance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
