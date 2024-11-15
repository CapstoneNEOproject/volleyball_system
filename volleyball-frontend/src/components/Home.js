import React from "react";
import Schedule from "./Schedule";
import "../Home.css";

function Home() {
  return (
    <div className="home-container">
      {/* Banner Section */}
      <section className="banner">
        <div className="banner-content">
          <h1>Welcome to the Northeast Ohio Volleyball Platform</h1>
          <p>Digitizing volleyball records and enhancing team management for a seamless experience.</p>
          <a href="/signup" className="banner-button">Get Started</a>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About the Platform</h2>
        <p>This platform is designed to transition our volleyball record-keeping and team performance tracking from paper to digital.</p>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <i className="icon-schedule"></i>
            <h3>Scheduling</h3>
            <p>Plan and organize matches and events effortlessly.</p>
          </div>
          <div className="feature-card">
            <i className="icon-analytics"></i>
            <h3>Performance Analytics</h3>
            <p>Analyze player and team performance with advanced metrics.</p>
          </div>
          <div className="feature-card">
            <i className="icon-user"></i>
            <h3>User Management</h3>
            <p>Manage referees, players, and admins with ease.</p>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="schedule-section">
        <h2>Upcoming Matches</h2>
        <Schedule />
      </section>
    </div>
  );
}

export default Home;