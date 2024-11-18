// src/components/AdminGameAdd.js
import React, { useState } from "react";
import axios from "axios";

const AdminGameAdd = () => {
  const [gameData, setGameData] = useState({
    date: "",
    time: "",
    team1: "",
    team2: "",
    location: "",
  });

  const handleChange = (e) => {
    setGameData({
      ...gameData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/scheduling/games/add/",
        gameData,
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Game added successfully!");
      setGameData({ date: "", time: "", team1: "", team2: "", location: "" });
    } catch (error) {
      console.error("Error adding game:", error);
      alert("Failed to add game. Make sure you have admin access.");
    }
  };

  return (
    <div>
      <h2>Add a New Game</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date:{" "}
          <input
            type="date"
            name="date"
            value={gameData.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Time:{" "}
          <input
            type="time"
            name="time"
            value={gameData.time}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Team 1:{" "}
          <input
            type="text"
            name="team1"
            value={gameData.team1}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Team 2:{" "}
          <input
            type="text"
            name="team2"
            value={gameData.team2}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Location:{" "}
          <input
            type="text"
            name="location"
            value={gameData.location}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Add Game</button>
      </form>
    </div>
  );
};

export default AdminGameAdd;
