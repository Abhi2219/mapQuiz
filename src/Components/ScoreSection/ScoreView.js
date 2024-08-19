import React from "react";
import './ScoreView';
const ScoreView = ({ totalQuestions, correctAnswers }) => {
  //const percentage = totalQuestions > 0 ? ((correctAnswers / totalQuestions) * 100).toFixed(2) : 0;

  return (
    <div className="score-view">
      <h2>Score</h2>
      <p>Correct Answers: {correctAnswers} / {totalQuestions}</p>
    </div>
  );
};

export default ScoreView;