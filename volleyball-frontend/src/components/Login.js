import React, { useState } from "react";
import "../PageStyles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/users/login/", {
        username,
        password,
      });

      if (response.status === 200) {
        const { role } = response.data; // Extract role from response
        setMessage("Login Successful!");

        // Redirect based on role
        if (role === "admin") {
          navigate("/admin-dashboard");
        } else if (role === "referee") {
          navigate("/referee-dashboard");
        } else {
          navigate("/player-dashboard");
        }
      }
    } catch (error) {
      setMessage("Invalid username or password.");
      console.error("Error during login:", error.response || error.message);
    }

    // Clear input fields
    setUsername("");
    setPassword("");

    // Clear message after 5 seconds
    setTimeout(() => setMessage(""), 5000);
  };

  return (
    <div className="page-container">
      <h1>Login</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <div className="input-group">
          <input
            className="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="">Username</label>
        </div>
        <div className="input-group">
          <input
            className="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="">Password</label>
        </div>
        <a href="/signup" className="new-account">
          <i>
            <b>Create new account?</b>
          </i>
        </a>
        <button type="submit" className="submit-it">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
