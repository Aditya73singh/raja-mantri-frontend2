// socket.js
import io from 'socket.io-client';

const socket = io('https://raja-mantri-backend2.onrender.com', {
  transports: ['websocket'], // Force WebSocket transport
  reconnection: true,
  reconnectionAttempts: 5
});

export default socket;
