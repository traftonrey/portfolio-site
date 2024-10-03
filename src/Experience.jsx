import React from 'react';
import './CSS/Experience.css'; // Separate CSS file for Experience if needed

const Experience = () => {
    return (
        <section id="Experience" className="Experience-section">
            <h2>My Experience</h2>
            <div className="Experience-grid">
                <div className="Experience-card">
                    <h3>Experience One</h3>
                    <p>A brief description of the Experience goes here. This can include technologies used and the Experience's purpose.</p>
                    <a href="#" target="_blank" rel="noopener noreferrer">View Experience</a>
                </div>
                <div className="Experience-card">
                    <h3>Experience Two</h3>
                    <p>A brief description of the Experience goes here. This can include technologies used and the Experience's purpose.</p>
                    <a href="#" target="_blank" rel="noopener noreferrer">View Experience</a>
                </div>
                <div className="Experience-card">
                    <h3>Experience Three</h3>
                    <p>A brief description of the Experience goes here. This can include technologies used and the Experience's purpose.</p>
                    <a href="#" target="_blank" rel="noopener noreferrer">View Experience</a>
                </div>
            </div>
        </section>
    );
};

export default Experience;
