// pages/WaitingRoom.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('https://raja-mantri-backend2.onrender.com');

function WaitingRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('user_joined', (updatedUsers) => {
      setUsers(updatedUsers);
    });

    socket.on('roles_assigned', () => {
      navigate(`/game/${roomId}`);
    });

    return () => {
      socket.off('user_joined');
      socket.off('roles_assigned');
    };
  }, [roomId, navigate]);

  return (
    <div className="waiting-room">
      <h2>Waiting Room - {roomId}</h2>
      <div className="players-list">
        {users.map((user, index) => (
          <div key={index} className="player-card">
            {user.username}
          </div>
        ))}
      </div>
      <p>Waiting for {4 - users.length} more players...</p>
    </div>
  );
}

export default WaitingRoom;
