import React, { useState } from "react";
import axios from "axios";

const Admin = () => {
  const [gameDetails, setGameDetails] = useState({
    team1: "",
    team2: "",
    date: "",
    location: "",
  });

  const handleChange = (e) => {
    setGameDetails({ ...gameDetails, [e.target.name]: e.target.value });
  };

  const handleAddGame = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/scheduling/add-game/",
        gameDetails,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Game added successfully");
    } catch (error) {
      console.error("Error adding game:", error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* Section for adding games */}
      <section>
        <h3>Add New Game</h3>
        <form onSubmit={handleAddGame}>
          <input
            type="text"
            name="team1"
            placeholder="Team 1"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="team2"
            placeholder="Team 2"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            required
          />
          <input type="date" name="date" onChange={handleChange} required />
          <button type="submit">Add Game</button>
        </form>
      </section>

      {/* Additional sections for adding teams or players can be placed here */}
    </div>
  );
};

export default Admin;
