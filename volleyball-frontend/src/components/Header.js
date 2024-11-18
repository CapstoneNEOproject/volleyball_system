// src/components/Header.js
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../PageStyles.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50); // Trigger sticky effect after 50px scroll
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <a href="/" className="logo-link">
          <span className="logo-animation">🏐</span> Northeast Ohio Volleyball
        </a>
      </div>
      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li className={window.location.hash === '#about' ? 'active' : ''}>
            <a href="/about">About</a>
          </li>
          <li className={window.location.hash === '#schedule' ? 'active' : ''}>
            <a href="/schedule">Schedule</a>
          </li>
          <li className={window.location.hash === '#contact' ? 'active' : ''}>
            <a href="/contact">Contact Us</a>
          </li>
          <li className={window.location.hash === '#login' ? 'active' : ''}>
            <a href="/login">Login</a>
          </li>
        </ul>
      </nav>
      <div className="hamburger" onClick={handleMenuToggle}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </header>
  );
};

export default Header;