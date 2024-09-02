import React, { useState } from 'react';
import './App.css';
import DrawingCanvas from './DrawingCanvas';

function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [word, setWord] = useState<string>('Cat'); // Example word

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="App">
      {gameStarted ? (
        <header className="App-header">
          <h1>Pictophone</h1>
          <p className="word">{word}</p>
          <DrawingCanvas />
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