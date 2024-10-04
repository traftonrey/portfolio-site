import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './CSS/Experience.css';

Modal.setAppElement('#root');
// test

const Experience = () => {
    const [experiences, setExperiences] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedExperience, setSelectedExperience] = useState(null);

    useEffect(() => {
        const cachedExperiences = localStorage.getItem('experiences');

        if (cachedExperiences) {
            setExperiences(JSON.parse(cachedExperiences));
        } else {
            fetch('https://g9qwkg2i33.execute-api.us-east-2.amazonaws.com/dev/experience')
                .then(response => response.json())
                .then(data => {
                    if (data.statusCode === 200 && data.body) {
                        const parsedData = JSON.parse(data.body);
                        if (Array.isArray(parsedData)) {
                            setExperiences(parsedData);
                            localStorage.setItem('experiences', JSON.stringify(parsedData));  // Cache the data
                        }
                    }
                })
                .catch(error => console.error('Error fetching experience data:', error));
        }
    }, []);

    const openModal = (experience) => {
        setSelectedExperience(experience);
        setModalIsOpen(true);
        document.querySelector('.site-container').classList.add('blur-background');  // Add blur effect to site-container
        document.body.style.overflow = 'hidden';  // Disable scrolling
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedExperience(null);
        document.querySelector('.site-container').classList.remove('blur-background');  // Remove blur effect
        document.body.style.overflow = 'auto';  // Re-enable scrolling
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'short' };
        let month, year;

        if (date.includes('-')) {
            [month, year] = date.split('-');
        } else if (date.includes('_')) {
            [month, year] = date.split('_');
        }

        const parsedDate = new Date(year, parseInt(month) - 1);
        return parsedDate.toLocaleDateString('en-US', options);
    };

    const formatDescription = (description) => {
        return description.split('•').map((bullet, index) => (
            bullet.trim() && <p key={index}>• {bullet.trim()}</p>
        ));
    };

    return (
        <section id="Experience" className="Experience-section">
            <h2>My Experience</h2>
            <div className="Experience-grid">
                {experiences.map((experience, index) => (
                    <div
                        key={index}
                        className="Experience-card"
                        onClick={() => openModal(experience)}
                        style={{ cursor: 'pointer' }}
                    >
                        <h3>{experience.title || 'Job Title'}</h3>
                        <div className="company-and-dates">
                            <strong>{experience['job-id'] || 'Company Name'}</strong>
                            <span className="job-type"> | {experience.type || 'Type of Work'}</span>
                            <span className="date">
                                {formatDate(experience.start_date)} - {formatDate(experience.end_date)}
                            </span>
                        </div>

                        {experience.top_5 && experience.top_5.length > 0 && (
                            <div className="skills">
                                <strong>Top Skills:</strong>
                                <ul>
                                    {experience.top_5.map((skill, i) => (
                                        <li key={i}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>


            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}  // Close when clicking outside
                shouldCloseOnOverlayClick={true}  // Ensure overlay click closes modal
                className="ReactModal__Content"
                overlayClassName="ReactModal__Overlay"
                contentLabel="Experience Details"
            >
                {selectedExperience && (
                    <div className="modal-body">
                        <h2>{selectedExperience.title || 'Job Title'}</h2>
                        <p><strong>Company:</strong> {selectedExperience['job-id'] || 'Company Name'}</p>
                        <p><strong>Dates:</strong> {formatDate(selectedExperience.start_date)} - {formatDate(selectedExperience.end_date)}</p>
                        <p><strong>Type:</strong> {selectedExperience.type}</p>
                        <p><strong>Description:</strong></p>
                        {formatDescription(selectedExperience.description)}
                        <p><strong>Technologies:</strong></p>
                        <ul className={selectedExperience.technologies && selectedExperience.technologies.length > 10 ? 'scrollable' : ''}>
                            {selectedExperience.technologies && selectedExperience.technologies.length > 0
                                ? selectedExperience.technologies.map((tech, i) => <li key={i}>{tech}</li>)
                                : <li>No technologies listed</li>}
                        </ul>
                        <button onClick={closeModal}>Close</button>
                    </div>
                )}
            </Modal>
        </section>
    );
};

export default Experience;
