import React, { useState } from "react";
import "./landingScreen.css";

import clickSound from "../../assets/audio/startButton.wav";

const LandingScreen = ({ onStartNum ,onStartAlp}) => {
  const [loading, setLoading] = useState(false);
  const [audio] = useState(new Audio(clickSound));

  const handleStartNum = () => {
    audio.play();
    setLoading(true);
    setTimeout(() => {
      onStartNum(); 
    }, 2000); 
  };
  const handleStartAlp = () => {
    audio.play();
    setLoading(true);
    setTimeout(() => {
      onStartAlp(); 
    }, 2000); 
  };

  return (
    <div className="landing-screen">
      <h1 className="title">Welcome to Fun Learning!</h1>
      {!loading ? (<>
        <button className="start-button" onClick={handleStartNum}>
          Fun with Numbers
        </button>
        <button className="start-button top-margin" onClick={handleStartAlp} >
        Fun with Alphabets
      </button>
      </>
      ) : (
        <div className="loading-bar-container">
        <div className="loading-bar-text">LOADING</div>
        <div className="loading-bar-text-behind">LOADING</div>
      </div>

      )}
    </div>
  );
};

export default LandingScreen;
