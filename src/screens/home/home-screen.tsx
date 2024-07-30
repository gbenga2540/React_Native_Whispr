import React, { FunctionComponent, useState } from 'react';
import { RefreshControl, ScrollView, TextStyle } from 'react-native';
import { fonts } from 'src/assets/fonts/fonts';
import {
  Button,
  ChatBox,
  Icon,
  Image,
  LoadingScreen,
  Pressable,
  Screen,
  Text,
  TextField,
  View,
} from 'src/components';
import { useCustomTheme } from 'src/context/theme/interfaces';
import { useAuthStore } from 'src/store/auth/auth.store';
import { useChatsStore } from 'src/store/chat/chat.store';

// TODO: Test
import { storiesData } from 'src/_mock/stories';
import { useGetUserChats } from 'src/domain/chat';

const HomeScreen: FunctionComponent = (): React.JSX.Element => {
  const { colors } = useCustomTheme();
  const { auth, clearAuth } = useAuthStore();
  const { chats: userChats, clearChats } = useChatsStore();

  const { isLoading, fetchNextPage, isFetching, refetch } = useGetUserChats({
    page: 1,
    limit: 10,
    user_id: auth?.user?.user_id!,
  });

  const [searchChat, setSearchChat] = useState<string>('');

  const ICON_STYLE: TextStyle = {
    color: colors.grayText,
  };

  const ADD_STORY_ICON_STYLE: TextStyle = {
    color: colors.inputPLText,
  };

  const log_out = () => {
    clearAuth();
    clearChats();
  };

  return (
    <Screen preset="fixed">
      <View
        marginTop={10}
        marginBottom={4}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Text
          text="Conversations"
          fontFamily={fonts.primaryFont_700}
          fontSize={18}
        />

        <Button
          onPress={log_out}
          alignItems="flex-end"
          width={50}
          height={50}
          backgroundColor={colors.transparent}
          children={
            <Icon name="new-conversation" size={24} style={ICON_STYLE} />
          }
        />
      </View>

      <View>
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View alignItems="center">
            <Pressable
              width={56}
              height={56}
              borderWidth={2}
              borderRadius={14}
              borderColor={colors.inputPLText}
              justifyContent="center"
              alignItems="center">
              <Icon name="add-story" style={ADD_STORY_ICON_STYLE} size={24} />
            </Pressable>
            <Text
              text="Your Story"
              marginTop={5}
              fontSize={12}
              textAlign="center"
            />
          </View>

          {storiesData.map((story, index) => (
            <View marginLeft={10} key={`${story?.user_id} - ${index}`}>
              <Pressable
                width={56}
                height={56}
                borderWidth={2}
                borderRadius={14}
                borderColor={story.viewed ? colors.inputPLText : colors.primary}
                justifyContent="center"
                alignItems="center">
                <Image
                  sourceFile={{ uri: story?.profile_picture }}
                  width={48}
                  height={48}
                  borderRadius={11}
                  resizeMode="cover"
                />

                <View
                  position="absolute"
                  backgroundColor={colors.background}
                  width={14}
                  height={14}
                  borderRadius={14}
                  right={-4}
                  top={-4}
                  justifyContent="center"
                  alignItems="center">
                  <View
                    width={9}
                    height={9}
                    borderRadius={9}
                    children={null}
                    backgroundColor={true ? colors.green : colors.inputPLText}
                  />
                </View>
              </Pressable>

              <Text
                text={story?.user_name || ''}
                marginTop={5}
                fontSize={12}
                textAlign="center"
                limit={8}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      <TextField
        marginBottom={10}
        borderRadius={8}
        containerHeight={45}
        autoFocus={false}
        value={searchChat}
        setValue={setSearchChat}
        marginTop={20}
        placeholder="Search"
        leftChild={
          <View marginRight={8}>
            <Icon name="search" style={ADD_STORY_ICON_STYLE} size={18} />
          </View>
        }
      />

      {isLoading && userChats?.length === 0 ? (
        <LoadingScreen />
      ) : userChats?.length > 0 ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={refetch} />
          }
          onScrollEndDrag={() => fetchNextPage()}
          showsVerticalScrollIndicator={false}>
          {userChats?.map((chat, index) => (
            <ChatBox key={`${chat.chat_id} - ${index}`} {...chat} />
          ))}
        </ScrollView>
      ) : (
        <View flex={1} justifyContent="center" alignItems="center">
          <Text
            text="No Chats Found!"
            fontSize={15}
            color={colors.inputPLText}
          />
        </View>
      )}
    </Screen>
  );
};

export default HomeScreen;
