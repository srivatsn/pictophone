import React, { useState } from 'react';
import './App.css';
import StartScreen from './StartScreen';
import GameScreen from './GameScreen';
import EndScreen from './EndScreen';
import { getRandomWord } from './wordSet';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [word, setWord] = useState('');
  const [numPlayers, setNumPlayers] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [results, setResults] = useState<Array<{ player: number; result: string; isImage: boolean }>>([]);

  const handleStartGame = (numPlayers: number) => {
    setNumPlayers(numPlayers);
    setGameStarted(true);
    setWord(getRandomWord());
  };

  const handleGameOver = (results: Array<{ player: number; result: string; isImage: boolean }>) => {
    setResults(results);
    setGameOver(true);
  };

  const handleRestart = () => {
    setGameStarted(false);
    setGameOver(false);
    setWord('');
    setNumPlayers(0);
    setResults([]);
  };

  return (
    <div className="App">
      {gameStarted ? (
        gameOver ? (
          <EndScreen startingWord={word} results={results} onRestart={handleRestart} />
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