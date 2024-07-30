import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IChat } from '../../interface/chat';

type State = {
  chats: IChat[];
};

type Action = {
  updateChats: (chats: IChat[]) => void;
  clearChats: () => void;
};

export const useChatsStore = create<
  State & Action,
  [['zustand/persist', unknown]]
>(
  persist(
    set => ({
      chats: [],
      page: { current_page: 1, next_page: 0, total_page: 1 },
      updateChats: chats => {
        set(() => ({
          chats: chats.sort((a, b) =>
            b.created_at!?.localeCompare(a.created_at!),
          ),
        }));
      },
      clearChats: () => {
        set(() => ({ chats: [] }));
      },
    }),
    {
      name: 'chats-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
