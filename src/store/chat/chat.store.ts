import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IChat } from '../../interface/chat';
import { IMessage } from 'src/interface/message';

type State = {
  chats: IChat[];
  isHydrated: boolean;
};

type Action = {
  addChat: (chat: IChat) => void;
  updateChats: (chats: IChat[]) => void;
  updateChatMessage: (
    chat_id: IChat['chat_id'],
    message: IMessage,
    stat: 'sending' | 'receiving',
  ) => void;
  clearChats: () => void;
  setHydrated: () => void;
};

export const useChatsStore = create<
  State & Action,
  [['zustand/persist', unknown]]
>(
  persist(
    (set, get) => ({
      chats: [],
      isHydrated: false,
      addChat: chat => {
        set(() => ({
          chats: [...get().chats, { ...chat }]?.sort((a, b) =>
            b?.updated_at!?.localeCompare(a?.updated_at!),
          ),
        }));
      },
      updateChats: chats => {
        set(() => ({
          chats: chats?.sort((a, b) =>
            b?.updated_at!?.localeCompare(a?.updated_at!),
          ),
        }));
      },
      updateChatMessage: (chat_id, message, stat) => {
        set(state => {
          const chat_to_update = state.chats?.find(
            ch => ch?.chat_id === chat_id,
          );

          if (chat_to_update && message?.data) {
            return {
              chats: [...state.chats]
                ?.map(ch => {
                  if (ch?.chat_id === chat_to_update?.chat_id) {
                    return {
                      ...ch,
                      created_at: message?.createdAt,
                      updated_at: message?.updatedAt,
                      last_message_info: {
                        ...ch?.last_message_info,
                        at: message?.createdAt,
                        data: message?.data,
                        type: message?.type,
                        status: message?.status,
                        sender_id: message?.sender_id,
                        unread:
                          stat === 'sending'
                            ? 0
                            : (ch?.last_message_info?.unread || 0) + 1,
                      },
                    };
                  }
                  return ch;
                })
                ?.sort((a, b) => b?.updated_at!?.localeCompare(a?.updated_at!)),
            };
          } else {
            return state;
          }
        });
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
