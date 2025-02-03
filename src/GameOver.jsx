import React from 'react';

const GameOver = ({ playerName, score, onPlayAgain }) => {
  return (
    <div className="game-over-container">
      <h1>Game Over, {playerName}!</h1>
      <div className="final-score">
        Your Score: <span>{score}</span>
      </div>
      <div className="game-over-message">
        {score === 6 ? "Congratulations! You're a color master!" : "Nice try! Want to play again?"}
      </div>
      <button onClick={onPlayAgain} className="play-again-btn">
        Play Again
      </button>
    </div>
  );
};

export default GameOver;