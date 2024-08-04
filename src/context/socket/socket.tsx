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
import { useNavigation } from '@react-navigation/native';

export const SocketProvider: ISocketProvider = function SocketProvider({
  children,
}) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const auth = useAuth().auth;
  const addChat = useChatsStore().addChat;
  const updateChatMessage = useChatsStore().updateChatMessage;
  const updateOnlineUsers = useOnlineUsersStore().updateOnlineUsers;
  const addMessageOffline = useMessagesStore().addMessageOffline;
  const updateMessages = useMessagesStore().updateMessages;

  const [inChatScreen, setInChatScreen] = useState<boolean>(false);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', e => {
      const screen =
        (e?.data?.state?.routes?.[0]?.params?.params as any)?.screen || '';
      if (screen === 'ChatScreen') {
        setInChatScreen(true);
      } else {
        setInChatScreen(false);
      }
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
        addChat({ ...data });
      }
      // TODO: Push Notification
    });

    return () => {
      socket.off('receive_new_chat');
    };
  }, [socket, addChat]);

  // new message received
  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('get_message', (data: IMessage) => {
      if (data?.data) {
        if (inChatScreen) {
          addMessageOffline(data.chat_id, data);
        }
        updateChatMessage(data.chat_id!, data, 'receiving');
        // TODO: Push Notification
      }
    });

    return () => {
      socket.off('get_message');
    };
  }, [socket, addMessageOffline, updateChatMessage, inChatScreen]);

  // new message sent to the recipient successfully
  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('message_sent', (data: IMessage) => {
      if (data?.data) {
        if (inChatScreen) {
          updateMessages(data.chat_id, [data]);
        }
        updateChatMessage(data.chat_id, data, 'sending');
      }
    });

    return () => {
      socket.off('message_sent');
    };
  }, [socket, updateMessages, updateChatMessage, inChatScreen]);

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
