// src/components/GameSetup.js
import React, { useState } from 'react';

const GameSetup = ({ setGameId, setPlayer }) => {
  const [playerName, setPlayerName] = useState('');
  const [gameName, setGameName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateGame = async () => {
    if (!playerName || !gameName) {
      alert('Please provide both your name and a game name.');
      return;
    }
    setLoading(true);
    try {
      // Create the game first.
      const createRes = await fetch('https://raja-mantri-backend22.onrender.com/api/game/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameName })
      });
      const gameData = await createRes.json();

      // Then join the game.
      const joinRes = await fetch('https://raja-mantri-backend22.onrender.com/api/game/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId: gameData._id, playerName })
      });
      const joinData = await joinRes.json();
      setPlayer(joinData.player);
      setGameId(gameData._id);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Game Setup</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={playerName}
        onChange={e => setPlayerName(e.target.value)}
        style={{ marginRight: '1rem', padding: '0.5rem' }}
      />
      <input
        type="text"
        placeholder="Enter game name"
        value={gameName}
        onChange={e => setGameName(e.target.value)}
        style={{ marginRight: '1rem', padding: '0.5rem' }}
      />
      <button onClick={handleCreateGame} disabled={loading}>
        {loading ? 'Loading...' : 'Create & Join Game'}
      </button>
    </div>
  );
};

export default GameSetup;
