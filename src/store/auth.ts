import { create } from 'zustand';

interface AuthState {
    user: string | null;
    login: (username: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    login: (username) => {
        localStorage.setItem('user', username);
        set({ user: username });
    },
    logout: () => {
        localStorage.removeItem('user');
        set({ user: null });
    },
}));