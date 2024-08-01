import React from 'react';
import { UserBoxProps } from './user-box.props';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { Button, Image, OnlineIndicator, Text } from 'src/components';
import { ViewStyle } from 'react-native';
import { DEFAULT_CONTAINER } from 'src/assets/styles/global';
import { fonts } from 'src/assets/fonts/fonts';
import { useChatsStore } from 'src/store/chat/chat.store';

export function UserBox({
  user,
  currentUser,
}: UserBoxProps): React.JSX.Element {
  const chats = useChatsStore().chats;

  const chatExist = chats.find(
    chat => chat.recipient_info?.user_id === user?.user_id,
  );
  const isUser = user?.user_id === currentUser?.user?.user_id;

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
        preset="link"
        text="Add"
        alignSelf="flex-start"
        disabled={Boolean(chatExist) || isUser}
      />
    </BottomSheetView>
  );
}
