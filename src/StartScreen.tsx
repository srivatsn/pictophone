import React, { useState } from 'react';
import { MIN_PLAYERS, MAX_PLAYERS } from './constants';

interface StartScreenProps {
  onStartGame: (numPlayers: number) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  const [numPlayers, setNumPlayers] = useState('');
  const [isValidNumPlayers, setIsValidNumPlayers] = useState(false);

  const handleNumPlayersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= MIN_PLAYERS && num <= MAX_PLAYERS) {
      setIsValidNumPlayers(true);
    } else {
      setIsValidNumPlayers(false);
    }
    setNumPlayers(value);
  };

  const handleStartGame = () => {
    onStartGame(parseInt(numPlayers, 10));
  };

  return (
    <div className="start-screen">
      <div className="title-container">
        <img src="/Pictophone.png" alt="Logo" className="logo" />
        <h1 className="title">Pictophone</h1>
      </div>
      <label htmlFor="num-players-input" className="num-players-label">
        Number of players ({MIN_PLAYERS} to {MAX_PLAYERS}):
      </label>
      <input
        id="num-players-input"
        type="number"
        value={numPlayers}
        onChange={handleNumPlayersChange}
        placeholder="Enter number of players"
        className="num-players-input"
        min={MIN_PLAYERS}
        max={MAX_PLAYERS}
      />
      <button
        onClick={handleStartGame}
        className="start-button"
        disabled={!isValidNumPlayers}
      >
        Start Game
      </button>
    </div>
  );
};

export default StartScreen;