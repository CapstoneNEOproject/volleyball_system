import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.log("Fetched analytics:", response.data); // Debug log
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

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <h3>Team Analytics</h3>
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
          {analytics?.teams?.map((team) => (
            <tr key={team.team}>
              <td>{team.team}</td>
              <td>{team.total_games}</td>
              <td>{team.wins}</td>
              <td>{team.losses}</td>
              <td>{team.win_percentage?.toFixed(2)}%</td>
              <td>{team.attendance_count}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
          {analytics?.referees?.map((referee) => (
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
