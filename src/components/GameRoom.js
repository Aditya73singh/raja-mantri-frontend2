// src/components/GameRoom.js
import React, { useEffect, useState } from 'react';

const GameRoom = ({ gameId, player }) => {
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    // Example polling: In production, consider using WebSockets for real-time game actions.
    const interval = setInterval(async () => {
      const res = await fetch(`https://raja-mantri-backend22.onrender.com/api/game/${gameId}`);
      const data = await res.json();
      setGameState(data);
    }, 5000);

    return () => clearInterval(interval);
  }, [gameId]);

  return (
    <div>
      <h1>Game Room</h1>
      <p>Welcome, {player.name}!</p>
      <p><strong>Your secret role has been assigned.</strong></p>
      <p>(This information remains hidden from other players.)</p>
      {gameState ? (
        <div>
          <h2>Current Game Status</h2>
          <pre>{JSON.stringify(gameState, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading game status...</p>
      )}
    </div>
  );
};

export default GameRoom;
