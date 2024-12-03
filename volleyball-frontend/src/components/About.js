import React, { useEffect } from 'react';
import '../PageStyles.css';
import MissionImage from '../assets/NEOAthleticsLogo.png'
import StoryImage from '../assets/founders-image.jpg'

function About() {
    // Fade-in effect when sections come into view
    useEffect(() => {
        const elements = document.querySelectorAll('.fade-element');
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
              }
            });
          },
          { threshold: 0.2 }
        );
        elements.forEach((el) => observer.observe(el));
      }, []);

    return (
        <div className="page-container">
            <h1 className="about-title">About Us</h1>
            <p className="about-intro">
                The Northeast Ohio Athletics Sports Management Company, or Northeast Ohio Volleyball Organization for short,
                is a community-driven organization focused on bringing volleyball enthusiasts together for friendly games and competitions.
            </p>

            <div className="section mission-section fade-element">
                <div className="text">
                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to foster a vibrant volleyball community where players of all skill levels can come
                        together, compete, and grow both on and off the court. Through tournaments, training sessions,
                        and community outreach, we aim to make volleyball accessible and enjoyable for everyone.
                    </p>
                </div>
                <div className="image">
                    <img
                        src={MissionImage}
                        alt="NEO Logo"
                    />
                </div>
            </div>

            <div className="section story-section fade-element">
                <div className="image">
                    <img
                        src={StoryImage}
                        alt="The Founders"
                    />
                </div>
                <div className="text">
                    <h2>Our Story</h2>
                    <p>
                        Northeast Ohio Volleyball was founded by a group of passionate volleyball players who wanted to
                        create more opportunities for others to experience the joy of the sport. Starting with just a
                        handful of local games, we've grown into an organization that hosts regular leagues, tournaments,
                        and community events. We're proud to be a part of Northeast Ohio's athletic culture and look
                        forward to many more years of serving our community.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;