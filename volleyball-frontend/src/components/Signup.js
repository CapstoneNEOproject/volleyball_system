// Signup.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register/", {
        username,
        password,
        email,
      });
      if (response.status === 201) {
        setMessage("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setMessage("Signup failed. Please try again.");
      console.error("Error during signup:", error);
    }
    setUsername("");
    setEmail("");
    setPassword("");
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  return (
    <div className="signup">
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSignup} className="signup-form">
        <div className="input-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
            <label htmlFor="">Username</label>
        </div>
        <div className="input-group">
     
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="">Email</label>
        </div>
        <div className="input-group">
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="">Password</label>
        </div>
        <a href="/login" className="login"><i><b>Already have an account?</b></i></a>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
