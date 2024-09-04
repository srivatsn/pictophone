import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import DrawingCanvas from './DrawingCanvas';
import StartScreen from './StartScreen';

function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [word, setWord] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [showTextbox, setShowTextbox] = useState<boolean>(false);
  const [numPlayers, setNumPlayers] = useState<number>(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const handleStartGame = (numPlayers: number) => {
    setNumPlayers(numPlayers);
    setGameStarted(true);
    setTimeLeft(60);
    setWord('example'); // Set the initial word or fetch it from an API
  };

  /**
   * End the current turn and move on to the next player.
   */
  const endTurn = () => {
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

    if (currentPlayer < numPlayers) {
      setCurrentPlayer(currentPlayer + 1);
    } else {
      setGameOver(true);
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
        gameOver ? (
          <div className="game-over-screen">
            <h1>Game Over</h1>
          </div>
        ) : (
            <header className="App-header">
              <h1 className="title-container">
                <img src="../public/Pictophone.png" alt="Logo" className="logo" />
                Pictophone
              </h1>
              <div className="timer-container">
                <p className="current-player">Player {currentPlayer}</p>
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
          )
      ) : (
          <StartScreen onStartGame={handleStartGame} />
      )}
    </div>
  );
}

export default App;