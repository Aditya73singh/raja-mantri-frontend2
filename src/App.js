// src/App.js
import React, { useState } from 'react';
import GameSetup from './components/GameSetup';
import GameRoom from './components/GameRoom';

function App() {
  const [gameId, setGameId] = useState(null);
  const [player, setPlayer] = useState(null);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      {!gameId ? (
        <GameSetup setGameId={setGameId} setPlayer={setPlayer} />
      ) : (
        <GameRoom gameId={gameId} player={player} />
      )}
    </div>
  );
}

export default App;
