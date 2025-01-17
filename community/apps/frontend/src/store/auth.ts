import { create } from 'zustand';
import { api } from '../lib/axios';
import toast from 'react-hot-toast';

interface AuthState {
  token: string | null;
  userId: string | null;
  isAdmin: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string, type: 'admin' | 'user') => Promise<void>;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  userId: localStorage.getItem('userId'),
  isAdmin: localStorage.getItem('isAdmin') === 'true',
  
  signIn: async (username: string, password: string) => {
    try {
      const response = await api.post('/api/v1/signin', { username, password });
      
      if (!response.data.token) {
        throw new Error('No token received from server');
      }
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('isAdmin', response.data.type === 'admin' ? 'true' : 'false');
      
      set({ 
        token: response.data.token,
        userId: response.data.userId,
        isAdmin: response.data.type === 'admin'
      });
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw new Error(error.response?.data?.message || 'Failed to sign in');
    }
  },

  signUp: async (username: string, password: string, type: 'admin' | 'user') => {
    try {
      const response = await api.post('/api/v1/signup', { username, password, type });
      if (response.status !== 200) {
        throw new Error(response.data?.message || 'Failed to sign up');
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      throw new Error(error.response?.data?.message || 'Failed to sign up');
    }
  },

  signOut: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
    set({ token: null, userId: null, isAdmin: false });
  },
}));