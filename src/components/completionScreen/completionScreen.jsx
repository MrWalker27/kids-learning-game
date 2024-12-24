import React , { useState , useEffect} from "react";
import "./completionScreen.css";

import clickSound from "../../assets/audio/startButton.wav";
import partypopper from "../../assets/audio/partypopper.mp3";

const CompletionScreen = ({ score, onRestart }) => {
  const [audio] = useState(new Audio(clickSound));
  const [audio2] = useState(new Audio(partypopper));

  useEffect(() => {
    audio2.play();
  },[audio2]);

  const audioPLayback = () => {
    audio.play()
    onRestart();
  }
  
  return (
    <div className="completion-screen">
      <h1 className="completion-message">🎉 Congratulations! 🎉</h1>
      <p className="completion-subtext">
        You've completed the game with a score of <strong>{score}</strong>!
      </p>
      <button className="restart-button" onClick={audioPLayback}>
        Home Screen
      </button>
    </div>
  );
};

export default CompletionScreen;
