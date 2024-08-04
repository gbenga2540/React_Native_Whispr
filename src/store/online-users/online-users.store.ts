import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IOnlineUser } from '../../interface/socket';

type State = {
  online_users: IOnlineUser[];
};

type Action = {
  updateOnlineUsers: (online_users: IOnlineUser[]) => void;
  isOnline: (user_id: IOnlineUser['user_id']) => boolean;
  clearOnlineUsers: () => void;
};

export const useOnlineUsersStore = create<
  State & Action,
  [['zustand/persist', unknown]]
>(
  persist(
    (set, get) => ({
      online_users: [],
      updateOnlineUsers: online_users => set(() => ({ online_users })),
      isOnline: user_id => {
        return get().online_users.some(user => user.user_id === user_id);
      },
      clearOnlineUsers: () => set(() => ({ online_users: [] })),
    }),
    {
      name: 'online-users-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
