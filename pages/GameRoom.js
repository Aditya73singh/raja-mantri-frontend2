// pages/GameRoom.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('https://raja-mantri-backend2.onrender.com');

function GameRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [myRole, setMyRole] = useState('');

  useEffect(() => {
    socket.on('roles_assigned', (rolesData) => {
      setRoles(rolesData);
      setMyRole(rolesData.find(r => r.isMe)?.role);
      setUsers(rolesData.map(r => ({ id: r.userId, username: r.username })));
    });

    socket.on('guess_result', (result) => {
      navigate(`/results/${roomId}`);
    });

    return () => {
      socket.off('roles_assigned');
      socket.off('guess_result');
    };
  }, [roomId, navigate]);

  const makeGuess = (guessedUserId) => {
    socket.emit('make_guess', { roomId, guessedUserId });
  };

  return (
    <div className="game-room">
      <h2>Game Room - {roomId}</h2>
      <div className="role-display">
        <h3>Your Role: {myRole}</h3>
      </div>
      <div className="players-list">
        {users.map((user) => (
          <div key={user.id} className="player-card">
            {user.username}
            {myRole === 'Mantri' && (
              <button onClick={() => makeGuess(user.id)}>Guess as Chor</button>
            )}
          </div>
        ))}
      </div>
      {myRole === 'Mantri' && <p>Guess who the Chor is!</p>}
    </div>
  );
}

export default GameRoom;
