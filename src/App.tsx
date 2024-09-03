import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import DrawingCanvas from './DrawingCanvas';

function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [word, setWord] = useState<string>('Cat'); // Example word
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [showTextbox, setShowTextbox] = useState<boolean>(false);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const endTurn = () => {
    // Logic to handle the end of the turn
    if (showTextbox) {
      // Reset to drawing mode with new word
      setWord(descriptionRef.current?.value || word);
      setShowTextbox(false);
      setTimeLeft(60);
    } else {
      // Show description input
      setShowTextbox(true);
      setTimeLeft(60);
    }
  };

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      endTurn();
    }
  }, [gameStarted, timeLeft]);

  return (
    <div className="App">
      {gameStarted ? (
        <header className="App-header">
          <h1>Pictophone</h1>
          <div className="timer-container">
            <p className="timer">Time left: {timeLeft}s</p>
            <button onClick={endTurn} className="end-turn-button">End Turn</button>
          </div>
          {!showTextbox &&
            <p className="word">{word}</p>
          }
          <DrawingCanvas editable={!showTextbox} />
          {showTextbox &&
            <input
              type="text"
              className="description"
              ref={descriptionRef}
              placeholder="Describe the drawing..." />
          }
        </header>
      ) : (
        <div className="start-screen">
          <h1>Pictophone</h1>
          <button onClick={handleStartGame} className="start-button">
            Start Game
          </button>
        </div>
      )}
    </div>
  );
}

export default App;