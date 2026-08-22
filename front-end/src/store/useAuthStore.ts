import { create } from 'zustand';

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  token: localStorage.getItem('@furniro:token'),
  
  setToken: (token: string) => {
    localStorage.setItem('@furniro:token', token);
    set({ token });
  },
  
  logout: () => {
    localStorage.removeItem('@furniro:token');
    set({ token: null });
  },
}));