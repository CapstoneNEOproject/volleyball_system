import React, { useEffect, useState } from "react";
import axios from "axios";

const RefereeDashboard = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchRefereeData();
  }, []);

  if (loading) {
    return <p>Loading referee dashboard...</p>;
  }

  return (
    <div>
      <h2>Referee Dashboard</h2>
      <h3>Your Recent Games</h3>
      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td>{game.game}</td>
              <td>{game.draw ? "Draw" : `${game.winning_team} won`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RefereeDashboard;
