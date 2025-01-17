import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const Arena: React.FC = () => {
  const WS_URL = import.meta.env.WS_URL;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [users, setUsers] = useState<{ id: string; x: number; y: number }[]>([]);
  const [socket, setSocket] = useState<any>(null);
  const [spaceId, setSpaceId] = useState<string>('');
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenParam = queryParams.get('token');
    const spaceIdParam = queryParams.get('spaceid');

    if (tokenParam && spaceIdParam) {
      setToken(tokenParam);
      setSpaceId(spaceIdParam);
    }
  }, []);

  useEffect(() => {
    if (token && spaceId) {
      const newSocket = io(WS_URL, {
        query: { token, spaceId },
      });

      newSocket.on('connect', () => {
        console.log('Connected to WebSocket');
      });

      newSocket.on('user-joined', (user: any) => {
        setUsers((prevUsers) => [...prevUsers, user]);
      });

      newSocket.on('user-left', (userId: string) => {
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
      });

      newSocket.on('movement', (user: any) => {
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === user.id ? { ...u, x: user.x, y: user.y } : u))
        );
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [token, spaceId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        users.forEach((user) => {
          ctx.fillStyle = 'blue';
          ctx.fillRect(user.x, user.y, 20, 20); // Draw a simple square for each user
        });
      }
    }
  }, [users]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (socket) {
      const move = { x: 0, y: 0 };
      switch (e.key) {
        case 'ArrowUp':
          move.y = -1;
          break;
        case 'ArrowDown':
          move.y = 1;
          break;
        case 'ArrowLeft':
          move.x = -1;
          break;
        case 'ArrowRight':
          move.x = 1;
          break;
        default:
          return;
      }
      socket.emit('move', move);
    }
  };

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown} style={{ outline: 'none' }}>
      <canvas ref={canvasRef} width={800} height={600} />
    </div>
  );
};

export default Arena;