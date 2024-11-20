import React, { useState } from "react";
import "../PageStyles.css";
import Signup from "./Signup.js";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState(""); // Updated to username
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    alert("Login form submitted!");

    // Add authentication logic here
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username, // Changed to username
        password,
      });
      if (response.status === 201) {
        setMessage("Login Successful!");
        setTimeout(() => navigate("/home"), 2000);
      }
    } catch (error) {
      setMessage("Username or Password incorrect!");
      console.log("Error during login:", error);
    }

    // Clearing up the form
    setUsername(""); // Updated field
    setPassword("");
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  return (
    <div className="page-container">
      <h1>Login</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <div className="input-group">
          <input
            className="username" // Updated className
            type="text" // Updated type
            value={username} // Updated value
            onChange={(e) => setUsername(e.target.value)} // Updated field
            required
          />
          <label htmlFor="">Username</label> {/* Updated label */}
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
