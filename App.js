// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import WaitingRoom from './pages/WaitingRoom';
import GameRoom from './pages/GameRoom';
import Results from './pages/Results';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/waiting/:roomId" element={<WaitingRoom />} />
          <Route path="/game/:roomId" element={<GameRoom />} />
          <Route path="/results/:roomId" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
