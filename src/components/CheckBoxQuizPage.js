import React, { useState } from 'react';
import './CheckBoxQuizPage.css';
import { FaVolumeUp, FaPause, FaBook, FaGamepad, FaQuestionCircle } from 'react-icons/fa';

function CheckBoxQuizPage() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentQuestionPlaying, setCurrentQuestionPlaying] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isGameDropdownOpen, setGameDropdownOpen] = useState(false);
    const [isQuizDropdownOpen, setQuizDropdownOpen] = useState(false);
    const [score, setScore] = useState(null);

    const questions = [
        {
            id: 1,
            question: "Which of the following are programming languages?",
            options: ["Python", "HTML", "JavaScript", "CSS"],
            correctAnswers: ["Python", "JavaScript"],
        },
        {
            id: 2,
            question: "Which of these are types of databases?",
            options: ["MongoDB", "React", "MySQL", "Express"],
            correctAnswers: ["MongoDB", "MySQL"],
        },
        {
            id: 3,
            question: "Which of these are JavaScript frameworks?",
            options: ["Angular", "Django", "Vue", "Flask"],
            correctAnswers: ["Angular", "Vue"],
        },
    ];

    const handleTextToSpeech = (questionId, questionText) => {
        const utterance = new SpeechSynthesisUtterance(questionText);
        utterance.lang = 'en-US';
        utterance.onend = () => {
            setIsPlaying(false);
            setCurrentQuestionPlaying(null);
        };
        speechSynthesis.speak(utterance);
        setIsPlaying(true);
        setCurrentQuestionPlaying(questionId);
    };

    const handlePause = () => {
        speechSynthesis.pause();
        setIsPlaying(false);
    };

    const handleAnswerSelection = (questionId, option) => {
        setSelectedAnswers((prevState) => {
            const currentAnswers = prevState[questionId] || [];
            if (currentAnswers.includes(option)) {
                return {
                    ...prevState,
                    [questionId]: currentAnswers.filter((answer) => answer !== option),
                };
            } else {
                return {
                    ...prevState,
                    [questionId]: [...currentAnswers, option],
                };
            }
        });
    };

    const handleSubmit = () => {
        let correctCount = 0;
        questions.forEach((question) => {
            const selected = selectedAnswers[question.id] || [];
            const isCorrect = selected.length === question.correctAnswers.length && selected.every((answer) =>
                question.correctAnswers.includes(answer)
            );
            if (isCorrect) {
                correctCount++;
            }
        });
        setScore(correctCount);
    };

    const toggleGameDropdown = () => {
        setGameDropdownOpen(!isGameDropdownOpen);
    };

    const toggleQuizDropdown = () => {
        setQuizDropdownOpen(!isQuizDropdownOpen);
    };

    return (
        <div className="CheckBoxQuizPage">
            <header className="top-bar">
                <img src="/path-to-your-icon/website-icon.png" alt="Website Icon" className="website-icon" />
                <div className="user-info">
                    <span className="username">User Name</span>
                    <img src="https://www.w3schools.com/w3images/avatar2.png" alt="User Icon" className="user-avatar" />
                </div>
            </header>
            <main className="content-container">
                <section className="content-left">
                    {questions.map((question) => (
                        <div key={question.id} className="quiz-question">
                            <div className="text-to-speech">
                                <button
                                    onClick={() => handleTextToSpeech(question.id, question.question)}
                                    disabled={isPlaying && currentQuestionPlaying === question.id}
                                    title="Play Question"
                                >
                                    <FaVolumeUp />
                                </button>
                                <button
                                    onClick={handlePause}
                                    disabled={!isPlaying || currentQuestionPlaying !== question.id}
                                    title="Pause"
                                >
                                    <FaPause />
                                </button>
                            </div>
                            <div className="header-section">
                                <h2 className="question">{question.question}</h2>
                            </div>
                            <div className="quiz-options">
                                {question.options.map((option, index) => (
                                    <label key={index} className={`quiz-option ${selectedAnswers[question.id]?.includes(option) ? 'selected' : ''}`}>
                                        <input
                                            type="checkbox"
                                            value={option}
                                            checked={selectedAnswers[question.id]?.includes(option) || false}
                                            onChange={() => handleAnswerSelection(question.id, option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                            {score !== null && (
                                <div className={`answer ${selectedAnswers[question.id]?.every((answer) => question.correctAnswers.includes(answer)) ? 'correct' : 'incorrect'}`}>
                                    Correct answers: {question.correctAnswers.join(', ')}
                                </div>
                            )}
                        </div>
                    ))}
                    <button className="submit-button" onClick={handleSubmit}>Submit</button>
                    {score !== null && <div className="score">Your score: {score} / {questions.length}</div>}
                </section>
                <aside className="content-right">
                    <div className="title-bar">
                        <h2 className="section-title">Quiz Navigation</h2>
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

export default CheckBoxQuizPage;
