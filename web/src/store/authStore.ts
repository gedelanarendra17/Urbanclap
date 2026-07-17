import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import apiClient from '../api/client';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  access_token: string | null;
  refresh_token: string | null;
  is_authenticated: boolean;
  setTokens: (access: string, refresh: string) => void;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  fetchMe: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      access_token: null,
      refresh_token: null,
      is_authenticated: false,

      setTokens: (access, refresh) => {
        set({ access_token: access, refresh_token: refresh, is_authenticated: true });
      },

      setUser: (user) => set({ user }),

      login: async (email, password) => {
        const res = await apiClient.post('/api/auth/login', { email, password });
        const { access_token, refresh_token } = res.data;
        set({ access_token, refresh_token, is_authenticated: true });
        // fetch user profile
        try {
          const me = await apiClient.get('/api/auth/me', {
            headers: { Authorization: `Bearer ${access_token}` },
          });
          set({ user: me.data });
        } catch {
          // /me may not exist yet; ignore
        }
      },

      fetchMe: async () => {
        try {
          const res = await apiClient.get('/api/auth/me');
          set({ user: res.data });
        } catch {
          // ignore
        }
      },

      logout: () => {
        set({ user: null, access_token: null, refresh_token: null, is_authenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        access_token: state.access_token,
        refresh_token: state.refresh_token,
        is_authenticated: state.is_authenticated,
        user: state.user,
      }),
    }
  )
);
