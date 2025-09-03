// src/App.jsx
import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <div className="container">
      <h1>React Counter + Live Text Preview</h1>

      {/* Counter */}
      <div className="counter">
        <h2>Counter: {count}</h2>
        <button onClick={() => setCount(count - 1)}>-</button>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>

      {/* Live Text Preview */}
      <div className="text-preview">
        <h2>Live Text Preview</h2>
        <input
          type="text"
          placeholder="Type something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <p>Preview: <strong>{text}</strong></p>
      </div>
    </div>
  );
}

export default App;
