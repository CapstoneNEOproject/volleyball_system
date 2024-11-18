import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SchedulePage from "./components/SchedulePage";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Admin from "./components/Admin";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PlayerDashboard from "./components/PlayerDashboard";
import RefereeDashboard from "./components/RefereeDashboard";
import AdminDashboard from "./components/AdminDashboard";
import AdminGameAdd from "./components/AdminGameAdd.js";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/dashboard/player" element={<PlayerDashboard />} />
            <Route path="/dashboard/referee" element={<RefereeDashboard />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
