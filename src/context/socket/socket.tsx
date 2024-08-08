import React, { useEffect, useState } from 'react';
import { SocketContext, ISocketProvider } from './interfaces';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../auth/interfaces';
import { EnvConfig } from 'src/utils/get-env';
import { IOnlineUser } from 'src/interface/socket';
import { useOnlineUsersStore } from 'src/store/online-users/online-users.store';
import { IChat } from 'src/interface/chat';
import { useChatsStore } from 'src/store/chat/chat.store';
import { IMessage } from 'src/interface/message';
import { useMessagesStore } from 'src/store/message/message.store';
import { NavigatorScreenParams, useNavigation } from '@react-navigation/native';
import { useQueryClient } from 'react-query';
import { HomeStackParamsList } from 'src/routes/types';
import { notificationManager } from 'src/services/notification';

export const SocketProvider: ISocketProvider = function SocketProvider({
  children,
}) {
  const navigation = useNavigation();
  const [socket, setSocket] = useState<Socket | null>(null);
  const auth = useAuth().auth;
  const { addChat, chats } = useChatsStore();
  const updateChatMessage = useChatsStore().updateChatMessage;
  const updateOnlineUsers = useOnlineUsersStore().updateOnlineUsers;
  const addMessageOffline = useMessagesStore().addMessageOffline;
  const updateMessages = useMessagesStore().updateMessages;
  const queryClient = useQueryClient();

  const [currentScreen, setCurrentScreen] =
    useState<NavigatorScreenParams<HomeStackParamsList>>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', e => {
      const screen = e?.data?.state?.routes?.[0]?.params?.params;
      setCurrentScreen(screen as NavigatorScreenParams<HomeStackParamsList>);
    });
    return unsubscribe;
  }, [navigation]);

  // start socket connection
  useEffect(() => {
    const newSocket = io(EnvConfig.baseURL.replace('/api/v1', ''), {
      query: {
        user_id: auth?.user?.user_id,
      },
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [auth]);

  // online users
  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.emit('add_new_online_user');
    socket.on('get_online_users', (data: IOnlineUser[]) => {
      updateOnlineUsers(data);
    });

    return () => {
      socket.off('get_online_users');
    };
  }, [socket, updateOnlineUsers]);

  // new chat received
  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('receive_new_chat', (data: IChat) => {
      if (data?.chat_id) {
        addChat({ ...data }, queryClient, auth?.user?.user_id);
      }
      notificationManager.showNotification({
        title: `@${data.recipient_info?.user_name} is now your friend!`,
        message: 'Start chatting with them now...',
      });
      // TODO: Push Notification
    });

    return () => {
      socket.off('receive_new_chat');
    };
  }, [socket, addChat, queryClient, auth?.user?.user_id]);

  // new message received
  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('get_message', (data: IMessage) => {
      if (data?.data) {
        if (
          currentScreen?.screen === 'ChatScreen' &&
          currentScreen?.params?.chat_id === data?.chat_id
        ) {
          addMessageOffline(data.chat_id, data);
        }

        // if (
        //   currentScreen?.screen === 'ChatScreen' &&
        //   currentScreen?.params?.chat_id !== data?.chat_id &&
        //   data?.type === 'Text'
        // ) {
        //   const chat = chats?.find(ch => ch?.chat_id === data?.chat_id);
        //   if (chat?.recipient_info?.user_name) {
        //     const key = MessageCipher.generateCipherKey(
        //       data.sender_id || '',
        //       auth?.user?.user_id || '',
        //     );

        //     if (key !== null) {
        //       notificationManager.showNotification({
        //         title: `@${chat?.recipient_info?.user_name} sent you a message!`,
        //         message: MessageCipher.decipherMessage(data?.data, key),
        //       });
        //     }
        //   }
        // }

        updateChatMessage(
          data.chat_id!,
          data,
          'receiving',
          queryClient,
          auth?.user?.user_id,
        );

        // TODO: Push Notification
      }
    });

    return () => {
      socket.off('get_message');
    };
  }, [
    socket,
    addMessageOffline,
    updateChatMessage,
    currentScreen,
    queryClient,
    auth?.user?.user_id,
    chats,
  ]);

  // new message sent to the recipient successfully
  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('message_sent', (data: IMessage) => {
      if (data?.data) {
        if (
          currentScreen?.screen === 'ChatScreen' &&
          currentScreen?.params?.chat_id === data?.chat_id
        ) {
          updateMessages(data.chat_id, [data]);
        }

        updateChatMessage(
          data.chat_id,
          data,
          'sending',
          queryClient,
          auth?.user?.user_id,
        );
      }
    });

    return () => {
      socket.off('message_sent');
    };
  }, [
    socket,
    updateMessages,
    updateChatMessage,
    currentScreen,
    queryClient,
    auth?.user?.user_id,
  ]);

  // message read
  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('message_read', (data: IMessage) => {
      if (data?.data) {
        updateMessages(data.chat_id, [data]);
        updateChatMessage(
          data.chat_id,
          data,
          'sending',
          queryClient,
          auth?.user?.user_id,
        );
      }
    });

    return () => {
      socket.off('message_read');
    };
  }, [
    socket,
    updateMessages,
    updateChatMessage,
    queryClient,
    auth?.user?.user_id,
  ]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        setSocket,
      }}>
      {children}
    </SocketContext.Provider>
  );
};
