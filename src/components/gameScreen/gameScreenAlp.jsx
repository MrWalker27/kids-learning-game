import React, { useState, useEffect } from "react";
import "./gameScreenAlp.css";
import firework from "../../assets/images/fireworks.png";

import dragStart from "../../assets/audio/dragStart.wav";
import dragEnd from "../../assets/audio/dragEnd.wav";
import fireworkAudio from "../../assets/audio/firework.mp3";
import wrongAnswer from "../../assets/audio/wrongAnswer.mp3";


const questions = [
  { id: 1, sequence: ["A", "B", "_"], options: ["D", "C", "E"], correct: "C" },
  { id: 2, sequence: ["L", "_", "N"], options: ["M", "Q", "O"], correct: "M" },
  { id: 3, sequence: ["P", "Q", "_"], options: ["S", "T", "R"], correct: "R" },
];

const GameScreenAlp = ({ onComplete }) => {
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
    } else {
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
           <div
           key={index}
           className={`sequence-item ${num === "_" ? "drop-zone" : ""}`}
           onDragOver={(e) => {e.preventDefault(); }}
           onDrop={(e) => { 
            handleDrop(e.dataTransfer.getData("number")); 
          }}
         >
           {num}
         </div>
          ))}
        </div>
        <div className="options">
          {currentQuestion.options.map((option) => (
            <div
              key={option}
              className="option"
              draggable
              onDragStart={(e) => {e.dataTransfer.setData("number", option);
                audio1.play();
              }}
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

export default GameScreenAlp;
