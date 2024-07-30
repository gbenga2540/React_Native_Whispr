import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IChat } from '../../interface/chat';
import { IMessage } from '../../interface/message';

type State = {
  user_messages: {
    [chat_id: string]: IMessage[];
  };
  isHydrated: boolean;
};

type Action = {
  updateMessages: (chat_id: IChat['chat_id'], messages: IMessage[]) => void;
  clearMessages: () => void;
  setHydrated: () => void;
};

export const useMessagesStore = create<
  State & Action,
  [['zustand/persist', unknown]]
>(
  persist(
    set => ({
      user_messages: {},
      isHydrated: false,
      updateMessages: (chat_id, messages) => {
        set(state => {
          const existing_data = state.user_messages?.[chat_id!] || [];

          const updated_data =
            messages.reduce(
              (acc, new_msg) => {
                const index = acc.findIndex(msg => msg._id === new_msg._id);
                if (index !== -1) {
                  acc[index] = new_msg;
                } else {
                  acc.push(new_msg);
                }
                return acc;
              },
              [...existing_data],
            ) || [];

          return {
            user_messages: {
              ...state.user_messages,
              [chat_id!]: updated_data.sort((a, b) =>
                a.createdAt!?.localeCompare(b.createdAt!),
              ),
            },
          };
        });
      },
      clearMessages: () => {
        set(() => ({ user_messages: {} }));
      },
      setHydrated: () => {
        set({ isHydrated: true });
      },
    }),
    {
      name: 'messages-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => state => {
        state?.setHydrated();
      },
    },
  ),
);
