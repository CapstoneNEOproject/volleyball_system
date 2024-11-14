// src/components/Header.js
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../PageStyles.css";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-logo">Northeast Ohio Volleyball Platform</div>
      <nav className="header-nav">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link to="/schedule" className={location.pathname === "/schedule" ? "active" : ""}>
          Schedule
        </Link>
        <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>
          About
        </Link>
        <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>
          Contact
        </Link>
        <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>
          Login
        </Link>
      </nav>
    </header>
  );
}

export default Header;