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

export function UserBox({
  user,
  currentUser,
}: UserBoxProps): React.JSX.Element {
  const { isLoading, mutate: createChatMutate } = useCreateChat();
  const queryClient = useQueryClient();
  const { chats, updateChats } = useChatsStore();

  const chatExist = chats.find(
    chat => chat.recipient_info?.user_id === user?.user_id,
  );
  const isUser = user?.user_id === currentUser?.user?.user_id;

  const createChat = () => {
    createChatMutate(
      {
        sender_id: String(currentUser?.user?.user_id),
        receiver_id: String(user?.user_id),
      },
      {
        onError(error, _variables, _context) {
          errorToast({
            message:
              (error as any)?.response?.data?.msg || (error as Error)?.message,
          });
        },
        onSuccess(data, _variables, _context) {
          if (data.data?.chat_id) {
            updateChats([...chats, { ...data.data }]);
            queryClient.cancelQueries([
              ['getUserChats', currentUser?.user?.user_id],
            ]);
            queryClient.invalidateQueries([
              'getUserChats',
              currentUser?.user?.user_id,
            ]);
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
          sourceFile={{ uri: user?.profile_picture }}
          width={40}
          height={40}
          borderRadius={20}
          alignSelf="flex-start"
        />
        <OnlineIndicator />
      </BottomSheetView>

      <BottomSheetView style={DEFAULT_CONTAINER}>
        <Text
          text={user?.full_name || ''}
          fontFamily={fonts.primaryFont_500}
          fontSize={16}
          limit={28}
        />
        <Text text={`@${user?.user_name}` || ''} fontSize={14} limit={34} />
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
        disabled={Boolean(chatExist) || isUser}
        isLoading={isLoading}
      />
    </BottomSheetView>
  );
}
