import { create } from "zustand";
import * as api from "@/lib/api";

const TOKEN_KEY = "kp_token";

interface AuthUser {
  id: string;
  username: string;
  name: string;
  progress: api.UserProgress | null;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isLoading: boolean;

  hydrate: () => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  loadProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  isLoading: true,

  hydrate: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      set({ isLoading: false });
      return;
    }
    set({ token });
    try {
      const profile = await api.getProfile(token);
      set({
        user: {
          id: profile.id,
          username: profile.username,
          name: profile.name,
          progress: profile.progress,
        },
        isLoading: false,
      });
    } catch {
      // Token expired or invalid
      localStorage.removeItem(TOKEN_KEY);
      set({ token: null, user: null, isLoading: false });
    }
  },

  login: async (username, password) => {
    const res = await api.login(username, password);
    localStorage.setItem(TOKEN_KEY, res.access_token);
    set({ token: res.access_token });
    // Load profile after login
    const profile = await api.getProfile(res.access_token);
    set({
      user: {
        id: profile.id,
        username: profile.username,
        name: profile.name,
        progress: profile.progress,
      },
    });
  },

  signup: async (username, name, password) => {
    const res = await api.signup(username, name, password);
    localStorage.setItem(TOKEN_KEY, res.access_token);
    set({ token: res.access_token });
    const profile = await api.getProfile(res.access_token);
    set({
      user: {
        id: profile.id,
        username: profile.username,
        name: profile.name,
        progress: profile.progress,
      },
    });
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({ token: null, user: null });
  },

  loadProfile: async () => {
    const { token } = get();
    if (!token) return;
    try {
      const profile = await api.getProfile(token);
      set({
        user: {
          id: profile.id,
          username: profile.username,
          name: profile.name,
          progress: profile.progress,
        },
      });
    } catch {
      // ignore
    }
  },
}));
