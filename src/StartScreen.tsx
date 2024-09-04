import React, { useState } from 'react';

interface StartScreenProps {
  onStartGame: (numPlayers: number) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  const [numPlayers, setNumPlayers] = useState('');
  const [isValidNumPlayers, setIsValidNumPlayers] = useState(false);

  const handleNumPlayersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0 && num <= 20) {
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
      <h1 className="title-container">
        Pictophone
      </h1>
      <label htmlFor="num-players-input" className="num-players-label">
        Number of players (0 to 20):
      </label>
      <input
        id="num-players-input"
        type="number"
        value={numPlayers}
        onChange={handleNumPlayersChange}
        placeholder="Enter number of players"
        className="num-players-input"
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