import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FlatList, Keyboard, TextStyle } from 'react-native';
import { fonts } from 'src/assets/fonts/fonts';
import { images } from 'src/assets/images/images';
import {
  Button,
  Icon,
  Image,
  LoadingScreen,
  MessageBox,
  OnlineIndicator,
  Pressable,
  Screen,
  Text,
  TextField,
  View,
} from 'src/components';
import { useCustomTheme } from 'src/context/theme/interfaces';
import { HomeStackParamsList } from 'src/routes/types';
import { useMessagesStore } from 'src/store/message/message.store';
import { useOnlineUsersStore } from 'src/store/online-users/online-users.store';
import { useSocket } from 'src/context/socket/interfaces';
import { IMessage } from 'src/interface/message';
import { useAuth } from 'src/context/auth/interfaces';
import { INewMessage, IRequestChatMessages } from 'src/interface/socket';
import MessageCipher from 'src/helpers/crypto/crypto';
import { useChatsStore } from 'src/store/chat/chat.store';
import { useQueryClient } from 'react-query';

const ChatScreen: FunctionComponent = (): React.JSX.Element => {
  //! MOCK
  const has_status: boolean = true;

  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const socket = useSocket().socket;
  const { colors, currentTheme } = useCustomTheme();
  const route = useRoute<RouteProp<HomeStackParamsList, 'ChatScreen'>>();
  const route_params = route.params;
  const isOnline = useOnlineUsersStore().isOnline;
  const updateChatMessage = useChatsStore().updateChatMessage;
  const auth = useAuth().auth;
  const { user_messages, updateMessages, isHydrated, addMessageOffline } =
    useMessagesStore();

  const tempChatMessages = user_messages?.[route_params.chat_id];
  const chatMessages = useMemo(() => tempChatMessages, [tempChatMessages]);

  const cipherKey = MessageCipher.generateCipherKey(
    auth?.user?.user_id!,
    route_params?.recipient_info?.user_id!,
  );

  const [newMsg, setNewMsg] = useState<string>('');

  // styles
  const ICON_STYLE: TextStyle = {
    color: colors.grayText,
  };
  const SEND_STYLE: TextStyle = {
    color: newMsg ? colors.primary : colors.inputPLText,
  };
  const ADD_ICON_STYLE: TextStyle = {
    color: colors.inputPLText,
  };

  const sendMessage = (msg: {
    data: IMessage['data'];
    type: IMessage['type'];
  }) => {
    const date = new Date();

    const temp_msg: IMessage = {
      chat_id: route_params.chat_id,
      data: msg.data,
      sender_id: auth?.user?.user_id,
      type: msg.type,
      status: 'U',
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    };

    // add msg locally and set it to not sent
    addMessageOffline(route_params.chat_id, {
      ...temp_msg,
      status: 'N',
    });
    updateChatMessage(
      route_params.chat_id,
      { ...temp_msg, status: 'N' },
      'sending',
      queryClient,
      auth?.user?.user_id,
    );

    // sent message to server and await a sent response of the actual message
    socket?.emit('send_message', {
      receiver_id: route_params.recipient_info?.user_id,
      message: temp_msg,
    } as INewMessage);

    setNewMsg('');
  };

  const preSendMessage = (msg: {
    data: IMessage['data'];
    type: IMessage['type'];
  }) => {
    if (msg?.data) {
      if (msg?.type === 'Text') {
        const cipheredData = MessageCipher.cipherMessage(msg.data, cipherKey);

        sendMessage({
          ...msg,
          data: cipheredData,
        });
      } else {
        sendMessage({ ...msg });
      }
    }
  };

  // Scroll down to last chat
  const flatListRef = useRef<FlatList | null>(null);
  useEffect(() => {
    const scroll_timer = setTimeout(() => {
      flatListRef.current !== null && flatListRef.current?.scrollToEnd();
    }, 100);

    return () => clearTimeout(scroll_timer);
  }, [chatMessages?.length]);

  // scroll the FlatList
  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () => {
      flatListRef.current !== null && flatListRef.current?.scrollToEnd();
    });
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
      flatListRef.current !== null && flatListRef.current?.scrollToEnd();
    });

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  // get chat messages using socket
  useEffect(() => {
    if (!socket || !isHydrated) {
      return;
    }

    const last_created_at: string =
      [...(chatMessages || [])]?.reverse()?.find(item => item?._id)
        ?.createdAt || '';

    socket.emit('request_user_messages', {
      chat_id: route_params.chat_id,
      from: last_created_at,
    } as IRequestChatMessages);

    socket.on('get_user_messages', (data: IMessage[]) => {
      if ((data || [])?.length > 0) {
        updateMessages(route_params.chat_id, data || []);
        updateChatMessage(
          route_params.chat_id,
          data.sort((a, b) => b?.createdAt!?.localeCompare(a?.createdAt!))?.[0],
          'receiving',
          queryClient,
          auth?.user?.user_id,
        );
      }
    });

    return () => {
      socket.off('get_user_messages');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // socket,
    isHydrated,
    // route_params.chat_id,
    // chatMessages,
    // updateMessages,
    // updateChatMessage,
    // queryClient,
    // auth?.user?.user_id,
  ]);

  return (
    <Screen preset="fixed">
      <View
        borderBottomWidth={1}
        borderBottomColor={colors.ddInputBackground}
        marginTop={10}
        marginBottom={12}
        paddingBottom={4}
        flexDirection="row"
        alignItems="center">
        <Pressable
          onPress={() => navigation.canGoBack() && navigation.goBack()}
          marginRight={2}
          width={30}
          height={30}
          justifyContent="center">
          <Icon name="back-btn" style={ICON_STYLE} />
        </Pressable>

        <Pressable
          marginRight={4}
          borderWidth={1}
          borderColor={has_status ? colors.primary : colors.inputPLText}
          width={30}
          height={30}
          borderRadius={30}
          justifyContent="center"
          alignItems="center">
          <Image
            sourceFile={
              route_params?.recipient_info?.profile_picture
                ? { uri: route_params?.recipient_info?.profile_picture }
                : images(currentTheme === 'dark').default_user
            }
            width={26}
            height={26}
            borderRadius={14}
          />

          <OnlineIndicator
            online={isOnline(route_params?.recipient_info?.user_id || '')}
            outerSize={14}
            innerSize={9}
            topOffset={-3}
            rightOffset={-3}
          />
        </Pressable>

        <View marginRight={'auto'}>
          <Text
            text={route_params.recipient_info?.user_name || ''}
            fontFamily={fonts.primaryFont_500}
            fontSize={17}
            limit={20}
          />
          <Text
            text={route_params.recipient_info?.bio || ''}
            fontFamily={fonts.primaryFont_300}
            fontSize={11}
            limit={39}
          />
        </View>

        <Button
          alignItems="flex-end"
          width={40}
          height={40}
          marginRight={3}
          backgroundColor={colors.transparent}
          children={
            <Icon
              name="voice-call"
              size={24}
              style={ICON_STYLE}
              fill={colors.background}
            />
          }
        />
        <Button
          alignItems="flex-end"
          width={37}
          height={40}
          backgroundColor={colors.transparent}
          children={
            <Icon
              name="video-call"
              size={24}
              style={ICON_STYLE}
              fill={colors.background}
            />
          }
        />
      </View>

      {/* TODO: add loading */}
      {/* {isLoading && chatMessages?.length === 0 ? ( */}
      {!isHydrated ? (
        <LoadingScreen />
      ) : (
        <View flex={1}>
          <FlatList
            ref={flatListRef}
            data={chatMessages || []}
            renderItem={({ item }) => (
              <MessageBox
                {...item}
                chat_recipient_id={String(route_params.recipient_info?.user_id)}
              />
            )}
            keyExtractor={(item, index) => `${item._id} - ${index}`}
            showsVerticalScrollIndicator={false}
            windowSize={8}
            initialNumToRender={8}
            maxToRenderPerBatch={8}
            // onRefresh={refetch}
            refreshing={false}
            ListEmptyComponent={
              <View flex={1} justifyContent="center" alignItems="center">
                <Text
                  text="No Messages Found!"
                  fontSize={15}
                  color={colors.inputPLText}
                  marginTop={150}
                />
              </View>
            }
          />
        </View>
      )}

      <View
        height={40}
        marginBottom={10}
        flexDirection="row"
        alignItems="center">
        <Pressable
          width={33}
          height={45}
          justifyContent="center"
          alignItems="flex-start">
          <Icon name="add-story" style={ADD_ICON_STYLE} size={24} />
        </Pressable>
        <TextField
          containerHeight={45}
          value={newMsg}
          setValue={setNewMsg}
          flex={1}
          autoCorrect={false}
          autoComplete="off"
        />
        <Pressable
          width={33}
          height={45}
          disabled={!newMsg}
          onPress={() =>
            preSendMessage({
              type: 'Text',
              data: newMsg,
            })
          }
          justifyContent="center"
          alignItems="flex-end">
          <Icon name="send-btn" style={SEND_STYLE} size={20} />
        </Pressable>
      </View>
    </Screen>
  );
};

export default ChatScreen;
