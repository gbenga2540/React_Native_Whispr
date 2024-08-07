import React from 'react';
import { UserBoxProps } from './user-box.props';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { Button, Image, OnlineIndicator, Text } from 'src/components';
import { Alert, ViewStyle } from 'react-native';
import { DEFAULT_CONTAINER } from 'src/assets/styles/global';
import { fonts } from 'src/assets/fonts/fonts';
import { useChatsStore } from 'src/store/chat/chat.store';
import { useCreateChat } from 'src/domain/chat';
import { errorToast, successToast } from 'src/helpers';
import { useQueryClient } from 'react-query';
import { images } from 'src/assets/images/images';
import { useCustomTheme } from 'src/context/theme/interfaces';
import { useSocket } from 'src/context/socket/interfaces';
import { INewChat } from 'src/interface/socket';
import { useAuth } from 'src/context/auth/interfaces';

export function UserBox({
  user,
  currentUser,
  online,
}: UserBoxProps): React.JSX.Element {
  const { isLoading, mutate: createChatMutate } = useCreateChat();
  const queryClient = useQueryClient();
  const { currentTheme } = useCustomTheme();
  const { chats, addChat } = useChatsStore();
  const auth = useAuth().auth;
  const socket = useSocket().socket;

  const chatExist = chats.some(
    chat => chat.recipient_info?.user_id === user?.user_id,
  );
  const isUser = user?.user_id === currentUser?.user?.user_id;

  const createChat = () => {
    createChatMutate(
      {
        recipient_id: String(user?.user_id),
      },
      {
        onError(error, _variables, _context) {
          errorToast({
            message:
              (error as any)?.response?.data?.msg || (error as Error)?.message,
          });
        },
        onSuccess(data, variables, _context) {
          if (data.data?.chat_id) {
            addChat({ ...data.data }, queryClient, auth?.user?.user_id);

            socket?.emit('add_new_chat', {
              receiver_id: variables.recipient_id,
              chat: {
                chat_id: data.data.chat_id,
                created_at: data.data.created_at,
                updated_at: data.data.updated_at,
                recipient_info: {
                  bio: auth?.user?.bio,
                  full_name: auth?.user?.full_name,
                  phone_number: auth?.user?.phone_number,
                  profile_picture: auth?.user?.profile_picture,
                  user_id: auth?.user?.user_id,
                  user_name: auth?.user?.user_name,
                },
              },
            } as INewChat);

            successToast({
              title: `@${user?.user_name} added!`,
              message: `You can now chat with @${user?.user_name}`,
            });
          } else {
            errorToast({
              message: data.msg,
            });
          }
        },
      },
    );
  };

  const confirmCreateChat = () => {
    Alert.alert('Add Friend?', `Do you want to add @${user?.user_name}?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Add Friend',
        onPress: () => {
          createChat();
        },
      },
    ]);
  };

  const CONTAINER: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  };
  const IMAGE_WRAPPER: ViewStyle = {
    marginRight: 9,
  };

  return (
    <BottomSheetView style={CONTAINER}>
      <BottomSheetView style={IMAGE_WRAPPER}>
        <Image
          sourceFile={
            user?.profile_picture
              ? { uri: user?.profile_picture }
              : images(currentTheme === 'dark').default_user
          }
          width={40}
          height={40}
          borderRadius={20}
          alignSelf="flex-start"
        />
        <OnlineIndicator online={online || false} />
      </BottomSheetView>

      <BottomSheetView style={DEFAULT_CONTAINER}>
        <Text
          text={user?.full_name || ''}
          fontFamily={fonts.primaryFont_500}
          fontSize={16}
          limit={28}
          marginBottom={1}
        />
        <Text
          text={`@${user?.user_name}` || ''}
          fontSize={14}
          limit={34}
          marginBottom={2}
        />
        <Text
          text={user?.bio || ''}
          fontFamily={fonts.primaryFont_300}
          fontSize={13}
        />
      </BottomSheetView>
      <Button
        onPress={confirmCreateChat}
        preset="link"
        text="Add"
        alignSelf="flex-start"
        disabled={chatExist || isUser}
        isLoading={isLoading}
      />
    </BottomSheetView>
  );
}
