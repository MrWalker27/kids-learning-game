import React, { useState, useEffect } from "react";
import "./gameScreenNum.css";
import firework from "../../assets/images/fireworks.png";

import dragStart from "../../assets/audio/dragStart.wav";
import dragEnd from "../../assets/audio/dragEnd.wav";
import fireworkAudio from "../../assets/audio/firework.mp3";
import wrongAnswer from "../../assets/audio/wrongAnswer.mp3";

const questions = [
  { id: 1, sequence: [1, 2, "_"], options: [3, 4, 5], correct: 3 },
  { id: 2, sequence: [4, 5, "_"], options: [6, 7, 8], correct: 6 },
  { id: 3, sequence: [7, "_", 9], options: [8, 10, 11], correct: 8 },
];

const GameScreenNum = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  const [isCorrect, setIsCorrect] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [audio1] = useState(new Audio(dragStart));
  const [audio2] = useState(new Audio(dragEnd));
  const [audio3] = useState(new Audio(fireworkAudio));
  const [audio4] = useState(new Audio(wrongAnswer));

  useEffect(() => {
    const fireworkImage = new Image();
    fireworkImage.src = firework;
  }, []);

  const handleDrop = (droppedValue) => {
    audio2.play();
    if (droppedValue !== currentQuestion.correct) {
      setIsCorrect(false); 
      audio4.play();
    } else if (droppedValue === currentQuestion.correct) {
      setScore(score + 1); 
  
      if (currentQuestionIndex === questions.length - 1) {
        onComplete(score + 1); 
      } else {
        setIsCorrect(true); 
        setShowPopup(true);
        audio3.play();
  
        setTimeout(() => {
          setIsCorrect(null); 
          setShowPopup(false);
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }, 3000);
      }
    }
  };
  

  return (
    <div className="game-screen">
      <h2 className="score">Score: {score}</h2>
      <div className="question-area">
        <div className="sequence">
          {currentQuestion.sequence.map((num, index) => (
            <span
              key={index}
              className={`sequence-item ${num === "_" ? "drop-zone" : ""}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(Number(e.dataTransfer.getData("number")))}
            >
              {num}
            </span>
          ))}
        </div>
        <div className="options">
          {currentQuestion.options.map((option) => (
            <div
              key={option}
              className="option"
              draggable
              onDragStart={(e) => {e.dataTransfer.setData("number", option);audio1.play();}}
            >
              {option}
            </div>
          ))}
        </div>
      </div>

      {isCorrect === false && (
        <div className="error-message">
          Oops! That's not the correct answer. Try again!
        </div>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <img src={firework} alt="Fireworks" className="fireworks-image" />
          <div className="popup-content">
            <h3>Correct! Well done!</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreenNum;
