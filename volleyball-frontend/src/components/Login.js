import React, { useState } from "react";
import "../PageStyles.css";
import Signup from "./Signup.js";

import { Link, useLocation } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login form submitted!");
    console.log(email, password);
    // Add authentication logic here

    // clearing up the form
    setEmail("");
    setPassword("");

  };

  return (
    <div className="page-container">
      <h1>Login</h1>
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
