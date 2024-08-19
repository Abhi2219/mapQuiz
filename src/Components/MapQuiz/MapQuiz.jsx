import React, { useState, useEffect } from "react";
import QuestionSection from "../QuestionSection/QuestionSection";
import MapView from "../MapSection/MapView";
import { questions } from "./quizData";
import "./MapQuiz.css";
const MapQuiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizStart, setQuizStart] = useState(false);

  useEffect(() => {
    setQuizData(questions);
  }, []);

  const handleNext = () => {
    setCurrentQuestion((prev) => (prev + 1) % quizData.length);
    setShowFeedback(false);
  };

  const handleAnswer = (userAnswer) => {
    const question = quizData[currentQuestion];
    const correct = userAnswer.toLowerCase() === question.answer.toLowerCase();

    if (correct) {
      setFeedback(
        `Correct! The capital of ${question.state} is indeed ${question.answer}.`
      );
      setCorrectAnswers((prev) => prev + 1);

      setCurrentQuestion((prev) => (prev + 1) % quizData.length);
    } else {
      setFeedback(`Incorrect! The correct answer is: ${question.answer}.`);
    }
    setShowFeedback(true);
  };

  return (
    <>
      <div className="map-quiz-container">
        <QuestionSection
          quizData={quizData}
          currentQuestion={currentQuestion}
          handleNext={handleNext}
          setQuizStart={setQuizStart}
          quizStart={quizStart}
          correctAnswers={correctAnswers}
          showFeedback={showFeedback}
          feedback={feedback}
        />
        <MapView
          quizData={quizData}
          currentQuestion={currentQuestion}
          handleAnswer={handleAnswer}
          quizStart={quizStart}
        />
      </div>
    </>
  );
};

export default MapQuiz;
