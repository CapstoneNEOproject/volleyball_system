import React, { useEffect, useState } from "react";
import axios from "axios";

const PlayerDashboard = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

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
    return <p>Loading player dashboard...</p>;
  }

  return (
    <div>
      <h2>Player Dashboard</h2>
      <h3>Your Recent Matches</h3>
      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Attended</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id}>
              <td>{match.game}</td>
              <td>{match.attended ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerDashboard;
