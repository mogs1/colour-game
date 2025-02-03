import React, { useState, useEffect } from 'react';
import GameOver from './GameOver';
import './App.css';

const App = () => {
  const [playerName, setPlayerName] = useState('');
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [targetColor, setTargetColor] = useState('');
  const [colorOptions, setColorOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);

  // Colors for the game
  const COLORS = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', 
    '#FDCB6E', '#6C5CE7', '#A8E6CF', 
    '#FF8ED4', '#5F27CD', '#10AC84'
  ];

  // Generate Game
  const initializeGame = () => {
    const shuffledColors = [...COLORS].sort(() => 0.5 - Math.random());
    const correctColor = shuffledColors[0];
    setTargetColor(correctColor);
    setColorOptions(shuffledColors.slice(0, 6).sort(() => 0.5 - Math.random()));
    setGameStatus('');
  };

  // Start game with player name
  const startGame = () => {
    if (playerName.trim()) {
      setIsNameEntered(true);
      initializeGame();
    }
  };

  // Handle color guess
  const handleColorGuess = (selectedColor) => {
    if (selectedColor === targetColor) {
      setScore(prevScore => prevScore + 1);
      setGameStatus('Correct! Great job!');
      
      if (score + 1 === 6) {
        setIsGameOver(true);
        return;
      }
      setTimeout(initializeGame, 1000);
      
    } else {
      setGameStatus('Wrong guess. Try again!',);
      setTimeout(() => setGameStatus(''), 1000);
    }
  };

  // Reset game
  const resetGame = () => {
    setIsGameOver(false);
    setScore(0);
    initializeGame();
  };

  // Render name input if not entered
  if (!isNameEntered) {
    return (
      <div className="name-entry">
        <input 
          type="text" 
          placeholder="Enter your name" 
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button onClick={startGame}>Start Game</button>
      </div>
    );
  }

  // Game over screen
  if (isGameOver) {
    return (
      <GameOver 
        playerName={playerName} 
        score={score} 
        onPlayAgain={resetGame} 
      />
    );
  }

  return (
    <div className="color-game-container">
      <div className="score-display" data-testid="score">
        Score: {score}
      </div>
      
      <div 
        className="color-box" 
        data-testid="colorBox" 
        style={{ backgroundColor: targetColor }}
      />
      
      <div className="game-instructions" data-testid="gameInstructions">
        Guess the color that matches the box above!
      </div>
      
      <div className="color-options">
        {colorOptions.map((color, index) => (
          <button
            key={index}
            data-testid="colorOption"
            className="color-option"
            style={{ backgroundColor: color }}
            onClick={() => handleColorGuess(color)}
          />
        ))}
      </div>
      
      {gameStatus && (
        <div 
          className="game-status" 
          data-testid="gameStatus"
        >
          <div
          style={ gameStatus === 'Correct! Great job!' ? {color: 'lightgreen'} : {color: 'red'}}>
           { gameStatus}
          </div>
        </div>
      )}
      
      <button 
        data-testid="newGameButton" 
        className="new-game-btn"
        onClick={resetGame}
      >
        New Game
      </button>
    </div>
  );
};

export default App;