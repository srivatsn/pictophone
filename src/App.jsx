import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [word, setWord] = useState('Cat'); // Example word
  const canvasRef = useRef(null);

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
  };

  const handleMouseMove = (e) => {
    if (e.buttons !== 1) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    context.stroke();
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
        ></canvas>
      </header>
    </div>
  );
}

export default App;
