import React, { useState } from "react";
import "../PageStyles.css";
import Signup from "./Signup.js";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    alert("Login form submitted!");

    // Add authentication logic here
    try{
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        email,
        password,
      });
      if (response.status === 201){
        setMessage("Login Successful!");
        setTimeout(() => navigate("/home"), 2000);
      }
    }catch (error){
      setMessage("Email or Password incorrect!")
      console.log("Error during login".error);
      
    }
    // clearing up the form
    setEmail("");
    setPassword("");

  };

  return (
    <div className="page-container">
      <h1>Login</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <div className="input-group">
          <input
            className="email"
            type="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="">Email</label>
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
        <a href="/signup" className="new-account"><i><b>Create new account?</b></i></a>
        <button type="submit" className="submit-it">Login</button>
      </form>
    </div>
  );
};

export default Login;
