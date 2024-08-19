import React, { useState } from "react";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import MapQuiz from "./Components/MapQuiz/MapQuiz";
import "./App.css";

const App = () => {
  const [showWelcomePage, setShowWelcomePage] = useState(true);

  const handleStartQuiz = () => {
    setShowWelcomePage(false);
  };

  return (
    <div>
      {showWelcomePage ? (
        <WelcomePage handleStartQuiz={handleStartQuiz} />
      ) : (
        <MapQuiz />
      )}
    </div>
  );
};

export default App;
