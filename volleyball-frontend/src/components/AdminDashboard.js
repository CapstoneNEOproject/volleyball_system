import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
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
      } catch (error) {
        console.error("Error fetching admin analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return <p>Loading admin dashboard...</p>;
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <h3>Team Analytics</h3>
      <table>
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
          {analytics.teams.map((team) => (
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

      <h3>Referee Analytics</h3>
      <table>
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
