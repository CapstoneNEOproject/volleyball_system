// src/components/Footer.js
import React from "react";
import "../PageStyles.css";
import { ReactComponent as FacebookIcon } from "../assets/facebook.svg";
import { ReactComponent as TwitterIcon } from "../assets/twitter.svg";
import { ReactComponent as InstagramIcon } from "../assets/instagram.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">Northeast Ohio Volleyball Platform</div>
        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/schedule">Schedule</a>
        </div>
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-button">
            <FacebookIcon />
            <span>Facebook</span>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-button">
            <TwitterIcon />
            <span>Twitter</span>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-button">
            <InstagramIcon />
            <span>Instagram</span>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        © 2024 Northeast Ohio Volleyball Platform. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;