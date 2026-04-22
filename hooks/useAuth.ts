import { create } from 'zustand';
import { User, UserRole } from '@/lib/types';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;

  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  signup: async (email: string, password: string, name: string) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Signup failed');
      }

      const data = await response.json();
      set({ user: data.user, token: data.token, loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Signup failed', loading: false });
      throw error;
    }
  },

  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Login failed');
      }

      const data = await response.json();
      set({ user: data.user, token: data.token, loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Login failed', loading: false });
      throw error;
    }
  },

  logout: () => {
    set({ user: null, token: null });
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  },

  checkAuth: async () => {
    set({ loading: true });
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        set({ user: data.user, loading: false });
      } else {
        set({ user: null, loading: false });
      }
    } catch {
      set({ user: null, loading: false });
    }
  },

  setUser: (user: User | null) => {
    set({ user });
  },
}));
