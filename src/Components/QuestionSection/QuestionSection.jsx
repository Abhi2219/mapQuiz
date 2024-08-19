import React from "react";
import "./QuestionSection.css";
import ScoreView from "../ScoreSection/ScoreView";

const QuestionSection = ({
  quizData,
  currentQuestion,
  handleNext,
  setQuizStart,
  quizStart,
  correctAnswers,
  showFeedback,
  feedback,
}) => {
  const isLastQuestion = currentQuestion === quizData.length - 1;

  const handleQuizStart = () => {
    setQuizStart(true);
  };

  const handleRestart = () => {
    window.location.reload();
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      handleRestart();
    } else {
      handleNext();
    }
  };

  return (
    <>
      <div className="question-container">
        {!quizStart ? (
          <div className="question-text" onClick={handleQuizStart}>
            Here you will see a question asking you to click on the map where
            the capital of a particular state is located.
            <br />
            You must click on the correct capital city on the map. Each correct
            answer gives you +1 point, and each incorrect answer gives you 0
            points.
            <br />
            <strong>Click below to start.</strong>
          </div>
        ) : (
          <div className="question-text">
            {quizData.length > 0
              ? quizData[currentQuestion]?.question
              : "Loading..."}
          </div>
        )}
        <button
          className="button-container"
          onClick={quizStart ? handleNextQuestion : handleQuizStart}
        >
          {isLastQuestion ? "Restart" : quizStart ? "Next" : "Start Quiz"}
        </button>
        {quizStart ? (
          <>
            {showFeedback && (
              <div className="feedback-message">
                <div>{feedback}</div>
              </div>
            )}
            <ScoreView
              totalQuestions={currentQuestion}
              correctAnswers={correctAnswers}
            />
          </>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default QuestionSection;
