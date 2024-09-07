import React, { useState } from 'react';
import './App.css';
import StartScreen from './StartScreen';
import GameScreen from './GameScreen';
import EndScreen from './EndScreen';

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

  const handleRestart = () => {
    setGameStarted(false);
    setGameOver(false);
    setWord('');
    setNumPlayers(0);
  };

  return (
    <div className="App">
      {gameStarted ? (
        gameOver ? (
          <EndScreen onRestart={handleRestart} />
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