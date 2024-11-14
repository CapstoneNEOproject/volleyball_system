import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '././Hub.css';  // Import CSS file for styling

const Hub = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Simulated loading time
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loading-spinner" />
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className="hub-container">
            <header className="hero-section">
                <h1 className="hero-title">The Northeast Ohio Recreational Volleyball Group</h1>
                <p className="hero-subtitle">Join the game, connect with the community, and spike your way to fun!</p>
                <Link to="/about" className="hero-button">Learn More</Link>
            </header>

            <nav className="navigation">
                <Link to="/about" className="nav-link">About</Link>
                <Link to="/contact" className="nav-link">Contact</Link>
                <Link to="/login" className="nav-link">Login</Link>
            </nav>

            <section className="content-section">
                <h2>Get Involved</h2>
                <p>We welcome players of all skill levels to join us in friendly, competitive volleyball games. Whether you're just starting or a seasoned player, we have a spot for you!</p>
            </section>

            <footer className="footer">
                <p>&copy; 2023 The Northeast Ohio Recreational Volleyball Group. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Hub;