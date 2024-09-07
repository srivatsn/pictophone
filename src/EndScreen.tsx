import React from 'react';

interface EndScreenProps {
    onRestart: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ onRestart }) => {
    return (
        <div className="game-over-screen">
            <h1 className="game-over-text">Game Over</h1>
            <button onClick={onRestart} className="restart-button">Restart Game</button>
        </div>
    );
};

export default EndScreen;