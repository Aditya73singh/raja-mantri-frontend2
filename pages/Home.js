// pages/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('https://raja-mantri-backend2.onrender.com');

function Home() {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const createRoom = () => {
    if (!username) return;
    socket.emit('create_room', username);
    socket.on('room_created', (roomId) => {
      navigate(`/waiting/${roomId}`);
    });
  };

  const joinRoom = () => {
    if (!username || !roomId) return;
    socket.emit('join_room', { roomId, username });
    socket.on('user_joined', () => {
      navigate(`/waiting/${roomId}`);
    });
  };

  return (
    <div className="home-container">
      <h1>Raja Mantri</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={createRoom}>Create Room</button>
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
    </div>
  );
}

export default Home;
