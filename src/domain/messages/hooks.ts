import { useMutation, useQuery } from 'react-query';
import { createMessage, getChatMessages } from './api';
import { GetUserMessagesRequest } from './types';
import { useMessagesStore } from '../../store/message/message.store';
import { useChatsStore } from 'src/store/chat/chat.store';

export function useCreateMessage() {
  return useMutation(createMessage, {
    mutationKey: 'createMessage',
  });
}

export function useGetChatMessages({
  chat_id,
}: {
  chat_id: GetUserMessagesRequest['chat_id'];
}) {
  const { updateMessages, user_messages, isHydrated } = useMessagesStore();
  const updateChatMessage = useChatsStore().updateChatMessage;

  const last_created_at: string =
    [...(user_messages?.[chat_id] || [])]?.reverse()?.find(item => item?._id)
      ?.createdAt || '';

  return useQuery(
    ['getChatMessages', chat_id],
    () =>
      getChatMessages({
        chat_id: chat_id,
        from: last_created_at,
      }),
    {
      refetchIntervalInBackground: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      enabled: isHydrated,
      refetchInterval: 1 * 60 * 1000, // TODO: Find a suitable time
      refetchOnMount: true,
      onSuccess: data => {
        if ((data?.data || [])?.length > 0) {
          updateMessages(chat_id, data?.data || []);
          updateChatMessage(
            chat_id,
            (data?.data || [])?.sort((a, b) =>
              b?.createdAt!?.localeCompare(a?.createdAt!),
            )?.[0],
            'receiving',
          );
        }
      },
    },
  );
}
