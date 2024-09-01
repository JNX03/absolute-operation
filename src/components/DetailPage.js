import React, { useState } from 'react';
import './DetailPage.css';
import { FaVolumeUp, FaPause, FaBook, FaGamepad, FaQuestionCircle } from 'react-icons/fa';

function DetailPage() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isGameDropdownOpen, setGameDropdownOpen] = useState(false);
    const [isQuizDropdownOpen, setQuizDropdownOpen] = useState(false);

    const handleTextToSpeech = () => {
        const utterance = new SpeechSynthesisUtterance("Your text goes here. Replace this with the actual text.");
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
        setIsPlaying(true);
    };

    const handlePause = () => {
        speechSynthesis.pause();
        setIsPlaying(false);
    };

    const toggleGameDropdown = () => {
        setGameDropdownOpen(!isGameDropdownOpen);
        setQuizDropdownOpen(false); // Close quiz dropdown if open
    };

    const toggleQuizDropdown = () => {
        setQuizDropdownOpen(!isQuizDropdownOpen);
        setGameDropdownOpen(false); // Close game dropdown if open
    };

    return (
        <div className="DetailPage">
            <header className="top-bar">
                <img src="website-icon.png" alt="Website Icon" className="website-icon" />
                <div className="user-info">
                    <span className="username">User Name</span>
                    <img src="https://www.w3schools.com/w3images/avatar2.png" alt="User Icon" className="user-avatar" />
                </div>
            </header>
            <main className="content-container">
                <section className="content-left">
                    <div className="header-section">
                        <h1 className="title">Title</h1>
                        <div className="text-to-speech">
                            <button onClick={handleTextToSpeech} disabled={isPlaying} title="Play">
                                <FaVolumeUp />
                            </button>
                            <button onClick={handlePause} disabled={!isPlaying} title="Pause">
                                <FaPause />
                            </button>
                        </div>
                    </div>
                    <p className="summary">Summary of the content goes here. Replace this with actual summary text.</p>
                    <div className="text-content">
                        <p>Main content text goes here. This should be replaced with the actual content.</p>
                    </div>
                </section>
                <aside className="content-right">
                    <div className="title-bar">
                        <h2 className="section-title">Section Title</h2>
                    </div>
                    <div className="side-menu">
                        <button className="menu-button">
                            <FaBook className="menu-icon" />
                            Lesson
                        </button>
                        <button className="menu-button" onClick={toggleGameDropdown}>
                            <FaGamepad className="menu-icon" />
                            Game
                        </button>
                        {isGameDropdownOpen && (
                            <div className="dropdown">
                                <button className="dropdown-item">Matching</button>
                                <button className="dropdown-item">Flash Card</button>
                            </div>
                        )}
                        <button className="menu-button" onClick={toggleQuizDropdown}>
                            <FaQuestionCircle className="menu-icon" />
                            Quiz
                        </button>
                        {isQuizDropdownOpen && (
                            <div className="dropdown">
                                <button className="dropdown-item">Multiple Choice</button>
                                <button className="dropdown-item">Check Box</button>
                                <button className="dropdown-item">Answer</button>
                                <button className="dropdown-item">True-False</button>
                            </div>
                        )}
                    </div>
                </aside>
            </main>
        </div>
    );
}

export default DetailPage;
