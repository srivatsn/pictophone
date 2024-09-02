import React, { useState } from 'react';
import './App.css';
import DrawingCanvas from './DrawingCanvas';

function App() {
  const [word, setWord] = useState<string>('Cat'); // Example word

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pictophone</h1>
        <p className="word">{word}</p>
        <DrawingCanvas />
      </header>
    </div>
  );
}

export default App;