import React, { useEffect, useRef } from 'react';
import { gameWs } from '../lib/websocket';
import { useGameStore } from '../store/game';
import { useAuthStore } from '../store/auth';

const TILE_SIZE = 32;
const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { spaceId, players, elements, dimensions } = useGameStore();
  const { userId } = useAuthStore();
  
  useEffect(() => {
    if (!spaceId || !userId) return;

    const connect = async () => {
      await gameWs.connect();
      gameWs.send('join', { spaceId, token: localStorage.getItem('token') });
    };

    gameWs.on('space-joined', (payload) => {
      const { spawn, users } = payload;
      useGameStore.setState((state) => {
        const newPlayers = new Map(state.players);
        users.forEach((user: any) => {
          newPlayers.set(user.userId, user);
        });
        newPlayers.set(userId, { userId, x: spawn.x, y: spawn.y });
        return { players: newPlayers };
      });
    });

    gameWs.on('user-joined', (payload) => {
      useGameStore.getState().updatePlayerPosition(payload.userId, payload.x, payload.y);
    });

    gameWs.on('user-left', (payload) => {
      useGameStore.getState().removePlayer(payload.userId);
    });

    gameWs.on('movement', (payload) => {
      useGameStore.getState().updatePlayerPosition(payload.userId, payload.x, payload.y);
    });

    connect();

    return () => {
      gameWs.close();
    };
  }, [spaceId, userId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const [width, height] = dimensions.split('x').map(Number);
    canvas.width = width * TILE_SIZE;
    canvas.height = height * TILE_SIZE;

    // Clear canvas
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw elements
    elements.forEach((element) => {
      ctx.fillStyle = '#9ca3af';
      ctx.fillRect(
        element.x * TILE_SIZE,
        element.y * TILE_SIZE,
        element.width * TILE_SIZE,
        element.height * TILE_SIZE
      );
    });

    // Draw players
    Array.from(players.values()).forEach((player, index) => {
      ctx.fillStyle = COLORS[index % COLORS.length];
      ctx.beginPath();
      ctx.arc(
        player.x * TILE_SIZE + TILE_SIZE / 2,
        player.y * TILE_SIZE + TILE_SIZE / 2,
        TILE_SIZE / 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });
  }, [dimensions, elements, players]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!userId) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / TILE_SIZE);
    const y = Math.floor((e.clientY - rect.top) / TILE_SIZE);

    gameWs.send('move', { x, y });
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      className="border border-gray-200 rounded-lg shadow-lg"
    />
  );
}