import React from 'react';

interface EndScreenProps {
    results: Array<{ player: number; result: string, isImage: boolean }>;
    startingWord: string;
    onRestart: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ results, startingWord, onRestart }) => {
    return (
        <div className="game-over-screen">
            <h1 className="game-over-text">Game Over</h1>
            <div className="results">
                <div className="result">
                    <p>Starting word: {startingWord}</p>
                </div>
                {results.map((result, index) => (
                    <div key={index} className="result">
                        <p>Player {result.player}</p>
                        {result.isImage === false ? (
                            <p>{result.result}</p>
                        ) : (
                            <img src={result.result} alt={`Drawing by Player ${result.player}`} />
                        )}
                    </div>
                ))}
            </div>
            <button onClick={onRestart} className="restart-button">Restart Game</button>
        </div>
    );
};

export default EndScreen;