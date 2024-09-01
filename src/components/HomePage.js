import React, { useState } from 'react';
import './HomePage.css';

function HomePage() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleVoiceSearch = () => {
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'en-US,th-TH'; // Supports both English and Thai
        recognition.onresult = (event) => {
            setSearchTerm(event.results[0][0].transcript);
        };
        recognition.start();
    };

    return (
        <div className="HomePage">
            <div className="top-bar">
                <img src="website-icon.png" alt="Website Icon" className="website-icon" />
                <div className="user-info">
                    <span>User Name</span>
                    <img src="https://www.w3schools.com/w3images/avatar2.png" alt="User Icon" />
                </div>
            </div>
            <div className="search-container">
                <input 
                    type="text" 
                    className="search-box" 
                    placeholder="Search anything..." 
                    value={searchTerm}
                    onChange={handleSearchChange} 
                />
                <i className="fa fa-search search-icon"></i>
                <button className="voice-search" onClick={handleVoiceSearch}>
                    <i className="fa fa-microphone"></i>
                </button>
            </div>
        </div>
    );
}

export default HomePage;
