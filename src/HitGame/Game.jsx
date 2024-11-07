import React, { useState, useEffect, useRef } from 'react';
import './Game.css'; // Import the CSS file

const Game = () => {
  const [score, setScore] = useState(0);
  const [keywordBox, setKeywordBox] = useState(null);
  const [isGameActive, setIsGameActive] = useState(true);
  const [gameTime, setGameTime] = useState(60); // 1 minute game time
  const [clicked, setClicked] = useState(false);
  const intervalRef = useRef(null); // To store the interval ID

  // Reset the game and timer
  const resetGame = () => {
    setScore(0);
    setGameTime(60);
    setIsGameActive(true);
    setClicked(false);
    clearInterval(intervalRef.current); // Clear any existing intervals
    randomizeKeyword();
  };

  useEffect(() => {
    if (isGameActive && gameTime > 0) {
      const timer = setInterval(() => {
        setGameTime(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    setIsGameActive(false); // Stop the game when time is over
  }, [gameTime, isGameActive]);

  // Function to randomly set keyword position in the grid
  const randomizeKeyword = () => {
    const randomBox = Math.floor(Math.random() * 9);
    setKeywordBox(randomBox);
    setClicked(false); // Reset clicked state for every new round
  };

  // Function to handle box clicks
  const handleClick = (boxIndex) => {
    if (!clicked) {
      if (boxIndex === keywordBox) {
        setScore(prev => prev + 5); // Correct answer
      } else {
        setScore(prev => prev - 2.5); // Incorrect answer
      }
      setClicked(true); // Mark clicked

      // Clear the current interval and set the keyword again after 1 second
      clearInterval(intervalRef.current); // Stop the current interval

      // Randomize the keyword after 1 second
      setTimeout(() => {
        randomizeKeyword(); // Randomize keyword after 1 second
        // Restart the interval after 1 second delay
        intervalRef.current = setInterval(() => {
          randomizeKeyword();
        }, 1000);
      }, 1000);
    }
  };

  // Function to handle end of the game
  const endGame = () => {
    alert(`Game Over! \nFinal Score: ${score}`);
  };

  // Randomly set keyword every 1 second if the game is active
  useEffect(() => {
    if (isGameActive) {
      intervalRef.current = setInterval(() => {
        randomizeKeyword();
      }, 1000);
    }

    // Cleanup interval when the game ends or is reset
    return () => clearInterval(intervalRef.current);
  }, [isGameActive]);

  // Game over check
  useEffect(() => {
    if (!isGameActive && gameTime === 0) {
      endGame();
    }
  }, [isGameActive, gameTime]);

  return (
    <div className="game-container">
      <h2 className="time-left">Time Left: {gameTime}s</h2>
      <h2 className="score">Score: {score}</h2>
      <div className="grid">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`game-box ${index === keywordBox && !clicked ? 'highlight' : ''}`}
          >
            {index === keywordBox && !clicked ? 'HIT' : ''}
          </div>
        ))}
      </div>
      <button onClick={resetGame} className="reset-button">Reset Game</button>
    </div>
  );
};

export default Game;
