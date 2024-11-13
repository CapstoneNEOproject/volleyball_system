import React from "react";
import Schedule from "./Schedule";

function Home() {
  return (
    <div>
      <h1>Welcome to the Northeast Ohio Volleyball Platform</h1>
      <p>
        This project aims to transition our volleyball record-keeping and team
        performance tracking from paper to digital.
      </p>
      <h2>Features:</h2>
      <ul>
        <li>Scheduling of matches and events</li>
        <li>Analytics on player and team performance</li>
        <li>User management for referees, players, and administrators</li>
      </ul>
      <h2>Get Started</h2>
      <p>
        Explore the application, manage your teams, and enhance your volleyball
        experience!
      </p>

      {/* Add Schedule here */}
      <Schedule />
    </div>
  );
}

export default Home;
