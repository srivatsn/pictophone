import React, { useState } from 'react';
import './App.css';
import StartScreen from './StartScreen';
import GameScreen from './GameScreen';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [word, setWord] = useState('');
  const [numPlayers, setNumPlayers] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleStartGame = (numPlayers: number) => {
    setNumPlayers(numPlayers);
    setGameStarted(true);
    setWord('example'); // Set the initial word or fetch it from an API
  };

  const handleGameOver = () => {
    setGameOver(true);
  };

  return (
    <div className="App">
      {gameStarted ? (
        gameOver ? (
          <div className="game-over-screen">
            <h1>Game Over</h1>
          </div>
        ) : (
            <GameScreen
              numPlayers={numPlayers}
              startingWord={word}
              onGameOver={handleGameOver}
            />
          )
      ) : (
          <StartScreen onStartGame={handleStartGame} />
      )}
    </div>
  );
}

export default App;