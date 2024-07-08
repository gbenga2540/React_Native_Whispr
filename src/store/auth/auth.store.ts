import { create } from 'zustand';

type State = {
  user: Auth | null;
};

type Action = {
  updateUser: (user: State['user']) => void;
};

export const useAuthStore = create<State & Action>(set => ({
  user: null,
  updateUser: user => set(() => ({ user: user })),
}));
