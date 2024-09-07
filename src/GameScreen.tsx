import React, { useState, useEffect, useRef } from 'react';
import DrawingCanvas from './DrawingCanvas';

interface GameScreenProps {
    numPlayers: number;
    startingWord: string;
    onGameOver: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({
    numPlayers,
    startingWord,
    onGameOver,
}) => {
    const [timeLeft, setTimeLeft] = useState(60);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [showTextbox, setShowTextbox] = useState(false);
    const [currentWord, setWord] = useState(startingWord);
    const descriptionRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            endTurn();
        }
    }, [timeLeft]);

    /**
     * End the current turn and move on to the next player.
     */
    const endTurn = () => {
        if (showTextbox) {
            // Reset to drawing mode with new word
            setWord(descriptionRef.current?.value || currentWord);
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
            onGameOver();
        }
    };

    return (
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
            {!showTextbox && <p className="word">{currentWord}</p>}
            <DrawingCanvas editable={!showTextbox} />
            {showTextbox && (
                <input
                    type="text"
                    className="description"
                    ref={descriptionRef}
                    placeholder="Describe the drawing..."
                />
            )}
        </header>
    );
};

export default GameScreen;