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
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* <a href="Signup"><i><b>Create new account?</b></i></a> */}
        <Link to="/signup" className="new-account">
          <i><b>Create new account?</b></i>
        </Link>
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
