import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IChat } from '../../interface/chat';

type State = {
  chats: IChat[];
  isHydrated: boolean;
};

type Action = {
  updateChats: (chats: IChat[]) => void;
  clearChats: () => void;
  setHydrated: () => void;
};

export const useChatsStore = create<
  State & Action,
  [['zustand/persist', unknown]]
>(
  persist(
    set => ({
      chats: [],
      isHydrated: false,
      updateChats: chats => {
        set(() => ({
          chats: chats.sort((a, b) =>
            b.updated_at!?.localeCompare(a.updated_at!),
          ),
        }));
      },
      clearChats: () => {
        set(() => ({
          chats: [],
        }));
      },
      setHydrated: () => {
        set({ isHydrated: true });
      },
    }),
    {
      name: 'chats-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => state => {
        state?.setHydrated();
      },
    },
  ),
);
