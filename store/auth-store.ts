"use client";

import { create } from 'zustand';

type User = { id: string; email: string; token: string } | null;

type AuthState = {
  user: User;
  login: (email: string, password: string) => Promise<User | null>;
  register: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: typeof window !== 'undefined' && localStorage.getItem('token') ? { id: localStorage.getItem('userId')!, email: localStorage.getItem('userEmail') || '', token: localStorage.getItem('token')! } : null,
  async login(email, password) {
    const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.id);
      localStorage.setItem('userEmail', data.email);
      const u = { id: data.id, email: data.email, token: data.token };
      set({ user: u });
      return u;
    }
    return null;
  },
  async register(email, password) {
    const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.id);
      localStorage.setItem('userEmail', data.email);
      const u = { id: data.id, email: data.email, token: data.token };
      set({ user: u });
      return u;
    }
    return null;
  },
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    set({ user: null });
  }
}));