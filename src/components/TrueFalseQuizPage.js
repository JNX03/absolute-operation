import React, { useState } from 'react';
import './TrueFalseQuizPage.css';
import { FaVolumeUp, FaPause, FaBook, FaGamepad, FaQuestionCircle } from 'react-icons/fa';

function TrueFalseQuizPage() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentQuestionPlaying, setCurrentQuestionPlaying] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isGameDropdownOpen, setIsGameDropdownOpen] = useState(false);
    const [isQuizDropdownOpen, setIsQuizDropdownOpen] = useState(false);
    const [score, setScore] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const questions = [
        {
            id: 1,
            question: "The sky is blue.",
            correctAnswer: "True",
        },
        {
            id: 2,
            question: "The Earth is flat.",
            correctAnswer: "False",
        },
        {
            id: 3,
            question: "Fish can fly.",
            correctAnswer: "False",
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
        if (isSubmitted) return; // Prevent changes after submission
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: answer,
        });
    };

    const handleSubmit = () => {
        let correctCount = 0;
        questions.forEach((question) => {
            if (selectedAnswers[question.id] === question.correctAnswer) {
                correctCount++;
            }
        });
        setScore(correctCount);
        setIsSubmitted(true);
    };

    const toggleGameDropdown = () => {
        setIsGameDropdownOpen(!isGameDropdownOpen);
    };

    const toggleQuizDropdown = () => {
        setIsQuizDropdownOpen(!isQuizDropdownOpen);
    };

    return (
        <div className="TrueFalseQuizPage">
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
                                {["True", "False"].map((option) => (
                                    <button
                                        key={option}
                                        className={`quiz-option ${selectedAnswers[question.id] === option ? 'selected' : ''}`}
                                        onClick={() => handleAnswerSelection(question.id, option)}
                                        disabled={isSubmitted}
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
                    <button className="submit-button" onClick={handleSubmit} disabled={isSubmitted}>
                        {isSubmitted ? "Submitted" : "Submit"}
                    </button>
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
                                <button className="dropdown-item">Answer Box</button>
                                <button className="dropdown-item">True-False</button>
                            </div>
                        )}
                    </div>
                </aside>
            </main>
        </div>
    );
}

export default TrueFalseQuizPage;
