import React, { useState } from 'react';
import './MultiQuizPage.css';
import { FaVolumeUp, FaPause } from 'react-icons/fa';

function MultiQuizPage() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentQuestionPlaying, setCurrentQuestionPlaying] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isGameDropdownOpen, setGameDropdownOpen] = useState(false);
    const [isQuizDropdownOpen, setQuizDropdownOpen] = useState(false);
    const [score, setScore] = useState(null);

    const questions = [
        {
            id: 1,
            question: "Question 1: What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Rome"],
            correctAnswer: "Paris",
        },
        {
            id: 2,
            question: "Question 2: Which is the largest ocean on Earth?",
            options: ["Atlantic", "Indian", "Arctic", "Pacific"],
            correctAnswer: "Pacific",
        },
        {
            id: 3,
            question: "Question 3: What is the chemical symbol for gold?",
            options: ["Au", "Ag", "Pb", "Pt"],
            correctAnswer: "Au",
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

    const handleAnswerSelection = (questionId, answer) => {
        setSelectedAnswers((prevState) => ({
            ...prevState,
            [questionId]: answer,
        }));
    };

    const handleSubmit = () => {
        let correctCount = 0;
        questions.forEach((question) => {
            if (selectedAnswers[question.id] === question.correctAnswer) {
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
        <div className="MultiQuizPage">
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
                                    <button
                                        key={index}
                                        className={`quiz-option ${selectedAnswers[question.id] === option ? 'selected' : ''}`}
                                        onClick={() => handleAnswerSelection(question.id, option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            {score !== null && (
                                <div className={`answer ${selectedAnswers[question.id] === question.correctAnswer ? 'correct' : 'incorrect'}`}>
                                    Correct answer: {question.correctAnswer}
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
                        <button className="menu-button">Lesson</button>
                        <button className="menu-button" onClick={toggleGameDropdown}>
                            Game
                        </button>
                        {isGameDropdownOpen && (
                            <div className="dropdown">
                                <button className="dropdown-item">Matching</button>
                                <button className="dropdown-item">Flash Card</button>
                            </div>
                        )}
                        <button className="menu-button" onClick={toggleQuizDropdown}>
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

export default MultiQuizPage;
