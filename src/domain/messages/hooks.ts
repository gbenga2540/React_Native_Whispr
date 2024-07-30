import { useMutation, useQuery } from 'react-query';
import { createMessage, getChatMessages } from './api';
import { GetUserMessagesRequest } from './types';
import { useMessagesStore } from '../../store/message/message.store';

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

  const last_message_exist = user_messages?.[chat_id]?.slice(-1) || [];
  const last_message = last_message_exist?.[0]?.createdAt || '';

  return useQuery(
    ['getChatMessages', chat_id],
    () =>
      getChatMessages({
        chat_id: chat_id,
        from: last_message,
      }),
    {
      refetchIntervalInBackground: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      enabled: isHydrated,
      onSuccess: data => {
        updateMessages(chat_id, data?.data || []);
      },
    },
  );
}
