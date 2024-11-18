import React from "react";
import Schedule from "./Schedule";
import "../Home.css";

function Home() {
  return (
    <div className="home-container">
      {/* Banner Section */}
      <section className="banner">
        <div className="banner-content">
          <h1>Welcome to the Best Volleyball League in Northeast Ohio!</h1>
          <p>Join the game, connect with the community, and spike your way into an unforgettable experience!</p>
          <a href="/signup" className="banner-button">Get Started</a>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About the League</h2>
        <p>The Northeast Ohio Volleyball Organization specializes in managing volleyball tournaments
          for youth, adults, and seniors. Our league welcomes players of all different skill levels to join us
          in friendly & competitive volleyball games!</p>
        <a href="/about" className="about-button">Learn More</a>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <i className="icon-schedule"></i>
            <h3>Event Registration</h3>
            <p>Login to register for teams and join tournaments effortlessly.</p>
          </div>
          <div className="feature-card">
            <i className="icon-analytics"></i>
            <h3>Performance Analytics</h3>
            <p>Login for indepth analysis of both player and team performance with advanced metrics!</p>
          </div>
          <div className="feature-card">
            <i className="icon-user"></i>
            <h3>Profile Customization</h3>
            <p>Login to customize your player profile and stand out!</p>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="schedule-section">
        <Schedule />
      </section>
    </div>
  );
}

export default Home;