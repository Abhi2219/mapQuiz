import React from "react";
import "./WelcomePage.css";

const WelcomePage = ({ handleStartQuiz }) => {
  return (
    <div className="page-container">
      <h1 className="title">Welcome to Map Quiz App</h1>
      <p className="subtitle">Can you guess the capital?</p>
      <button className="start-button" onClick={handleStartQuiz}>
        Let's Get Started
      </button>
    </div>
  );
};

export default WelcomePage;
