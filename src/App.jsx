import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [word, setWord] = useState('Cat'); // Example word
  const [history, setHistory] = useState([]);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    context.beginPath();
    isDrawing.current = true;
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    context.stroke();
  };

  const handleMouseUp = () => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    setHistory((prevHistory) => [...prevHistory, context.getImageData(0, 0, canvas.width, canvas.height)]);
    isDrawing.current = false;
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
    if (newHistory.length > 0) {
      context.putImageData(newHistory[newHistory.length - 1], 0, 0);
    } else {
      context.fillStyle = '#FFFFFF';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvas.width, canvas.height);
    setHistory([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pictophone</h1>
        <p className="word">{word}</p>
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          className="drawing-canvas"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        ></canvas>
        <div className="buttons">
          <button onClick={handleUndo}>Undo</button>
          <button onClick={handleClear}>Clear</button>
        </div>
      </header>
    </div>
  );
}

export default App;
