// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as TwitterIcon } from "../assets/twitter.svg";
import { ReactComponent as FacebookIcon } from "../assets/facebook.svg";
import { ReactComponent as InstagramIcon } from "../assets/instagram.svg";
import "../PageStyles.css";
function Footer() {
    return (
      <footer className="footer">
        <div className="footer-top">
          <Link to="/about" className="footer-link">About Us</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
          <Link to="/schedule" className="footer-link">Schedule</Link>
        </div>
        
        <div className="footer-center">
          <TwitterIcon className="social-icon" />
          <span className="divider">/</span>
          <a href="https://www.facebook.com/groups/570375109793016/" target="_blank" rel="noopener noreferrer">
          <FacebookIcon className="social-icon" />
          </a>
          <span className="divider">/</span>
          <a href="https://www.instagram.com/neoathletics/?hl=en" target="_blank" rel="noopener noreferrer">
          <InstagramIcon className="social-icon" />
          </a>
        </div>
        
        <div className="footer-bottom">
          <Link to="/" className="footer-brand">Northeast Ohio Volleyball</Link>
        </div>
        
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} Northeast Ohio Volleyball Platform. All rights reserved.
        </div>
      </footer>
    );
  }
  
  export default Footer;