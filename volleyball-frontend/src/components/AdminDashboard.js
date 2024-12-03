/*import React, { useEffect, useState } from "react";
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

export default AdminDashboard;*/

import React, { useEffect, useState } from "react";
import axios from "axios"; // Optional: To save changes to a backend server.

const AdminDashboard = () => {
  const [data, setData] = useState({ players: [], referees: [], games: [] });
  const [newGame, setNewGame] = useState({
    team1: "",
    team2: "",
    date: "",
    time: "",
    location: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Load data from JSON file
  useEffect(() => {
    fetch("/data/adminData.json")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  // Promote player to referee
  const promoteToReferee = (playerId) => {
    const player = data.players.find((p) => p.id === playerId);
    if (player) {
      const updatedPlayers = data.players.filter((p) => p.id !== playerId);
      const updatedReferees = [
        ...data.referees,
        { ...player, role: "referee" },
      ];
      setData({ ...data, players: updatedPlayers, referees: updatedReferees });
      saveChangesToFile({
        ...data,
        players: updatedPlayers,
        referees: updatedReferees,
      });
    }
  };

  // Add a new game
  const addGame = () => {
    if (
      !newGame.team1 ||
      !newGame.team2 ||
      !newGame.date ||
      !newGame.time ||
      !newGame.location
    ) {
      setErrorMessage("All fields are required to add a game.");
      return;
    }
    const newId = data.games.length + 1;
    const updatedGames = [...data.games, { id: newId, ...newGame }];
    setData({ ...data, games: updatedGames });
    setNewGame({ team1: "", team2: "", date: "", time: "", location: "" });
    saveChangesToFile({ ...data, games: updatedGames });
  };

  // Save changes to JSON file (optional backend saving)
  const saveChangesToFile = (updatedData) => {
    axios
      .post("/save-data", updatedData) // Update this endpoint as needed.
      .then(() => console.log("Changes saved successfully!"))
      .catch((error) => console.error("Error saving changes:", error));
  };

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>

      <h2>Players</h2>
      <ul>
        {data.players.map((player) => (
          <li key={player.id}>
            {player.username} ({player.role})
            <button onClick={() => promoteToReferee(player.id)}>
              Promote to Referee
            </button>
          </li>
        ))}
      </ul>

      <h2>Referees</h2>
      <ul>
        {data.referees.map((referee) => (
          <li key={referee.id}>
            {referee.username} ({referee.role})
          </li>
        ))}
      </ul>

      <h2>Games</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Team 1</th>
            <th>Team 2</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {data.games.map((game) => (
            <tr key={game.id}>
              <td>{game.team1}</td>
              <td>{game.team2}</td>
              <td>{game.date}</td>
              <td>{game.time}</td>
              <td>{game.location}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New Game</h3>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div>
        <input
          type="text"
          placeholder="Team 1"
          value={newGame.team1}
          onChange={(e) => setNewGame({ ...newGame, team1: e.target.value })}
        />
        <input
          type="text"
          placeholder="Team 2"
          value={newGame.team2}
          onChange={(e) => setNewGame({ ...newGame, team2: e.target.value })}
        />
        <input
          type="date"
          value={newGame.date}
          onChange={(e) => setNewGame({ ...newGame, date: e.target.value })}
        />
        <input
          type="time"
          value={newGame.time}
          onChange={(e) => setNewGame({ ...newGame, time: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={newGame.location}
          onChange={(e) => setNewGame({ ...newGame, location: e.target.value })}
        />
        <button onClick={addGame}>Add Game</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
