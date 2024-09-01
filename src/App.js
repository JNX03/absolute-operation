import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DetailPage from './components/DetailPage';
import MultiQuizPage from './components/MultiQuizPage';
import HomePage from './components/HomePage';
import CheckBoxQuizPage from './components/CheckBoxQuizPage';
import AnswerBoxPage from './components/AnswerBoxPage';
import TrueFalseQuizPage from './components/TrueFalseQuizPage';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/detail/:id" element={<DetailPage />} />
                    <Route path="/detail/:id/multiquiz" element={<MultiQuizPage />} />
                    <Route path="/detail/:id/checkbox" element={<CheckBoxQuizPage />} />
                    <Route path="/detail/:id/answerbox" element={<AnswerBoxPage />} />
                    <Route path="/detail/:id/truefalse" element={<TrueFalseQuizPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
