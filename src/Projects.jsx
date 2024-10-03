import React from 'react';
import './CSS/Projects.css'; // Separate CSS file for Projects if needed

const Projects = () => {
    return (
        <section id="projects" className="projects-section">
            <h2>My Projects</h2>
            <div className="projects-grid">
                <div className="project-card">
                    <h3>Project One</h3>
                    <p>A brief description of the project goes here. This can include technologies used and the project's purpose.</p>
                    <a href="#" target="_blank" rel="noopener noreferrer">View Project</a>
                </div>
                <div className="project-card">
                    <h3>Project Two</h3>
                    <p>A brief description of the project goes here. This can include technologies used and the project's purpose.</p>
                    <a href="#" target="_blank" rel="noopener noreferrer">View Project</a>
                </div>
                <div className="project-card">
                    <h3>Project Three</h3>
                    <p>A brief description of the project goes here. This can include technologies used and the project's purpose.</p>
                    <a href="#" target="_blank" rel="noopener noreferrer">View Project</a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
