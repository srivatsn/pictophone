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
      <div className="floating-shape shape1"></div>
      <div className="floating-shape shape2"></div>
      <div className="start-screen-content">
        <div className="title-container">
          <img src="/Pictophone.png" alt="Logo" className="logo" />
          <h1 className="title">Pictophone</h1>
        </div>
        <p className="game-description">
          A fun drawing and guessing game! Players take turns drawing pictures and guessing what they represent. 
          See how your ideas transform as they pass from player to player!
        </p>
        <label htmlFor="num-players-input" className="num-players-label">
          Number of players (1 to 20):
        </label>
        <input
          id="num-players-input"
          type="number"
          value={numPlayers}
          onChange={handleNumPlayersChange}
          placeholder="Enter number of players"
          className="num-players-input"
          min="1"
          max="20"
        />
        <button
          onClick={handleStartGame}
          className="start-button"
          disabled={!isValidNumPlayers}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default StartScreen;