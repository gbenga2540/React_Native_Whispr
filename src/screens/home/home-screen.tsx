import React, { FunctionComponent, useState } from 'react';
import { ScrollView, TextStyle } from 'react-native';
import { fonts } from 'src/assets/fonts/fonts';
import {
  Button,
  Icon,
  Image,
  Pressable,
  Screen,
  Text,
  TextField,
  View,
} from 'src/components';
import { useCustomTheme } from 'src/context/theme/interfaces';

import { storiesData } from 'src/_mock/stories';

const HomeScreen: FunctionComponent = (): React.JSX.Element => {
  const { colors } = useCustomTheme();

  const [searchChat, setSearchChat] = useState<string>('');

  const ICON_STYLE: TextStyle = {
    color: colors.grayText,
  };

  const ADD_STORY_ICON_STYLE: TextStyle = {
    color: colors.inputPLText,
  };

  return (
    <Screen preset="scroll">
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
          alignItems="flex-end"
          width={50}
          height={50}
          backgroundColor={colors.transparent}
          children={
            <Icon name="new-conversation" size={24} style={ICON_STYLE} />
          }
        />
      </View>

      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View>
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
              borderColor={colors.inputPLText}
              justifyContent="center"
              alignItems="center">
              <Image
                sourceFile={{ uri: story?.profile_picture }}
                width={47}
                height={47}
                borderRadius={11}
                resizeMode="cover"
              />
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

      <TextField
        minHeight={40}
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
    </Screen>
  );
};

export default HomeScreen;
