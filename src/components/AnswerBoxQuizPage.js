import React, { useState } from 'react';
import './AnswerBoxQuizPage.css';
import { FaVolumeUp, FaPause, FaBook, FaGamepad, FaQuestionCircle } from 'react-icons/fa';

function AnswerBoxQuizPage() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentQuestionPlaying, setCurrentQuestionPlaying] = useState(null);
    const [answers, setAnswers] = useState({});
    const [isGameDropdownOpen, setIsGameDropdownOpen] = useState(false);
    const [isQuizDropdownOpen, setIsQuizDropdownOpen] = useState(false);
    const [score, setScore] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const questions = [
        {
            id: 1,
            question: "What are the primary colors?",
            correctAnswers: ["red", "blue", "yellow"],
        },
        {
            id: 2,
            question: "Name a programming language used for web development.",
            correctAnswers: ["javascript", "python", "ruby"],
        },
        {
            id: 3,
            question: "What is the capital of France?",
            correctAnswers: ["paris"],
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

    const handleInputChange = (questionId, value) => {
        if (isSubmitted) return; // Prevent changes after submission
        setAnswers({
            ...answers,
            [questionId]: value.toLowerCase().split(',').map(answer => answer.trim()), // Support multiple answers
        });
    };

    const handleSubmit = () => {
        let correctCount = 0;
        questions.forEach((question) => {
            const userAnswers = answers[question.id] || [];
            const isCorrect = userAnswers.length === question.correctAnswers.length &&
                userAnswers.every((answer) => question.correctAnswers.includes(answer));
            if (isCorrect) {
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
        <div className="AnswerBoxQuizPage">
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
                            <div className="answer-box">
                                <input
                                    type="text"
                                    placeholder="Type your answers, separated by commas"
                                    value={answers[question.id]?.join(', ') || ''}
                                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                                    disabled={isSubmitted}
                                />
                            </div>
                            {score !== null && (
                                <div className={`answer ${answers[question.id]?.every((answer) => question.correctAnswers.includes(answer)) ? 'correct' : 'incorrect'}`}>
                                    Correct answers: {question.correctAnswers.join(', ')}
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

export default AnswerBoxQuizPage;
