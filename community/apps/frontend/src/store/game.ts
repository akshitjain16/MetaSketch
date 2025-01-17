import { create } from 'zustand';
import { api } from '../lib/axios';

interface Player {
  userId: string;
  x: number;
  y: number;
  avatar?: string;
}

interface GameState {
  spaceId: string | null;
  players: Map<string, Player>;
  elements: any[];
  dimensions: string;
  setSpace: (spaceId: string) => Promise<void>;
  updatePlayerPosition: (userId: string, x: number, y: number) => void;
  removePlayer: (userId: string) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  spaceId: null,
  players: new Map(),
  elements: [],
  dimensions: '100x200',

  setSpace: async (spaceId: string) => {
    const response = await api.get(`/api/v1/space/${spaceId}`);
    set({ 
      spaceId,
      elements: response.data.elements,
      dimensions: response.data.dimensions,
    });
  },

  updatePlayerPosition: (userId: string, x: number, y: number) => {
    const players = new Map(get().players);
    const player = players.get(userId);
    if (player) {
      players.set(userId, { ...player, x, y });
      set({ players });
    }
  },

  removePlayer: (userId: string) => {
    const players = new Map(get().players);
    players.delete(userId);
    set({ players });
  },
}));