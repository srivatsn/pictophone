import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import DrawingCanvas from './DrawingCanvas';

function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [word, setWord] = useState<string>('Cat'); // Example word
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [showTextbox, setShowTextbox] = useState<boolean>(false);
  const [numPlayers, setNumPlayers] = useState('');
  const [isValidNumPlayers, setIsValidNumPlayers] = useState(false);
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

  const handleNumPlayersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0 && num < 20) {
      setIsValidNumPlayers(true);
    } else {
      setIsValidNumPlayers(false);
    }
    setNumPlayers(value);
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
          <h1 className="title-container">
            <img src="../public/Pictophone.png" alt="Logo" className="logo" />
            Pictophone
          </h1>
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
            <h1 className="title-container">
              <img src="../public/Pictophone.png" alt="Logo" className="logo" />
              Pictophone
            </h1>
            <label htmlFor="num-players-input" className="num-players-label">
              Number of players (0 to 20):
            </label>
            <input
              type="number"
              value={numPlayers}
              onChange={handleNumPlayersChange}
              placeholder="Enter number of players"
              className="num-players-input"
            />
            <button
              onClick={handleStartGame}
              className="start-button"
              disabled={!isValidNumPlayers}>
            Start Game
          </button>
        </div>
      )}
    </div>
  );
}

export default App;