import React, { useState, useEffect } from 'react';
import './App.css';
import DrawingCanvas from './DrawingCanvas';

function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [word, setWord] = useState<string>('Cat'); // Example word
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [showTextbox, setShowTextbox] = useState<boolean>(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setShowTextbox(true);
    }
  }, [gameStarted, timeLeft]);

  return (
    <div className="App">
      {gameStarted ? (
        <header className="App-header">
          <h1>Pictophone</h1>
          {
            timeLeft > 0 ? (
              <>
                <p className="word">{word}</p>
                <p className="timer">Time left: {timeLeft}s</p>
              </>
            ) : null
          }
          <DrawingCanvas editable={timeLeft > 0} />
          {
            showTextbox && (
              <input
                type="text"
                className="description"
                readOnly
                placeholder="Describe the drawing..."
              />
            )
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