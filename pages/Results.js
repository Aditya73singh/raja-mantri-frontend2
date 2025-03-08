// pages/Results.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('https://raja-mantri-backend2.onrender.com');

function Results() {
  const { roomId } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    socket.on('guess_result', (guessResult) => {
      setResult(guessResult);
    });

    return () => {
      socket.off('guess_result');
    };
  }, []);

  return (
    <div className="results">
      <h2>Round Results</h2>
      {result && (
        <div>
          <p>Guess was {result.success ? 'Correct!' : 'Incorrect'}</p>
          {/* Add points display here when backend provides it */}
          <button onClick={() => socket.emit('create_room', 'username')}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default Results;
