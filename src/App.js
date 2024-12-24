import React, { useState } from "react";
import LandingScreen from "./components/landingScreen/landingScreen";
import GameScreenNum from "./components/gameScreen/gameScreenNum";
import GameScreenAlp from "./components/gameScreen/gameScreenAlp";
import CompletionScreen from "./components/completionScreen/completionScreen";

import backgroundMusic from "./assets/audio/bgaudio.mp3";

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("landing"); 
  const [finalScore, setFinalScore] = useState(0);

  const [audio] = useState(new Audio(backgroundMusic));
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  
  const handleMouseEnter = () => {
    if (!isAudioPlaying) {
      audio.loop = true; 
      audio.play().then(() => {
        setIsAudioPlaying(true);
      }).catch((error) => {
      });
    }
  };

  const onStartNum = () => {
    setCurrentScreen("gameNum");
  };
  const onStartAlp = () => {
    setCurrentScreen("gameAlp");
  };

  const handleGameComplete = (score) => {
    setFinalScore(score); 
    setCurrentScreen("completion"); 
  };

  const handleRestart = () => {
    setFinalScore(0); 
    setCurrentScreen("landing"); 
  };

  return (
    <div  onMouseEnter={handleMouseEnter}>
      {currentScreen === "landing" && <LandingScreen onStartNum={onStartNum} onStartAlp={onStartAlp}/>}
      {currentScreen === "gameNum" && <GameScreenNum onComplete={handleGameComplete} />}
      {currentScreen === "gameAlp" && <GameScreenAlp onComplete={handleGameComplete} />}
      {currentScreen === "completion" && (
        <CompletionScreen score={finalScore} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default App;
