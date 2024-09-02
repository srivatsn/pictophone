import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import DrawingCanvas from './DrawingCanvas';

function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [word, setWord] = useState<string>('Cat'); // Example word
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [showTextbox, setShowTextbox] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const descriptionRef = useRef<HTMLInputElement>(null);

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
    }
  }, [gameStarted, timeLeft, showTextbox, word, description]);

  return (
    <div className="App">
      {gameStarted ? (
        <header className="App-header">
          <h1>Pictophone</h1>
          <p className="timer">Time left: {timeLeft}s</p>
          {showTextbox ? (
            <input
              type="text"
              className="description"
              ref={descriptionRef}
              placeholder="Describe the drawing..."
            />
          ) : (
            <>
              <p className="word">{word}</p>
              <DrawingCanvas editable={!showTextbox} />
            </>
          )}
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