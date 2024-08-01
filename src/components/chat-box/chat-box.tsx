import React from 'react';
import { ChatBoxProps } from './chat-box.props';
import { useCustomTheme } from 'src/context/theme/interfaces';
import {
  Icon,
  Image,
  OnlineIndicator,
  Pressable,
  Text,
  View,
} from 'src/components';
import { fonts } from 'src/assets/fonts/fonts';
import { TextStyle } from 'react-native';
import TimeAgo from 'javascript-time-ago';
import { useNavigation } from '@react-navigation/native';
import { infoToast } from 'src/helpers';
import { images } from 'src/assets/images/images';
import { MessageCipher } from 'src/helpers/crypto/crypto';
import { useAuth } from 'src/context/auth/interfaces';

export function ChatBox({
  recipient_info,
  chat_id,
  last_message_info,
  online,
}: ChatBoxProps): React.JSX.Element {
  const navigation = useNavigation();
  const { colors, currentTheme } = useCustomTheme();
  const timeAgo = new TimeAgo('en-US');
  const auth = useAuth().auth;

  const navToChat = () => {
    if (chat_id) {
      navigation.navigate('AppStack', {
        screen: 'HomeStack',
        params: {
          screen: 'ChatScreen',
          params: {
            chat_id: chat_id,
            recipient_info,
            online: online ?? false,
          },
        },
      });
    } else {
      infoToast({
        message: 'Invalid Chat ID!',
      });
    }
  };

  const TICK_STYLE: TextStyle = {
    color:
      last_message_info?.status === 'R' ? colors.primary : colors.inputPLText,
    marginBottom: last_message_info?.status === 'U' ? 0 : -4,
    marginRight: last_message_info?.status === 'U' ? 0 : -5,
    alignSelf: 'flex-start',
  };

  const messageCipher = new MessageCipher();
  const is_user: boolean = auth?.user?.user_id === last_message_info?.sender_id;

  const cipherKey = messageCipher.generateCipherKey(
    String(last_message_info?.sender_id),
    is_user ? String(recipient_info?.user_id) : String(auth?.user?.user_id),
  );

  const deciphered_text =
    last_message_info?.type === 'Text'
      ? messageCipher.decipherMessage(
          String(last_message_info?.data),
          cipherKey,
        )
      : '';

  return (
    <Pressable
      onPress={navToChat}
      flexDirection="row"
      marginTop={7}
      flex={1}
      marginBottom={10}>
      <View>
        <Image
          sourceFile={
            recipient_info?.profile_picture
              ? { uri: recipient_info?.profile_picture }
              : images(currentTheme === 'dark').default_user
          }
          borderRadius={12}
          width={48}
          height={48}
        />

        <OnlineIndicator topOffset={-2} rightOffset={-2} online />
      </View>

      <View marginLeft={10} flex={1}>
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginTop={1}
          marginBottom={6}>
          <Text
            text={recipient_info?.user_name || ''}
            limit={23}
            fontFamily={fonts.primaryFont_500}
            fontSize={17}
          />
          {last_message_info?.at && (
            <Text
              text={timeAgo.format(
                new Date(last_message_info?.at || '')?.getTime(),
              )}
              color={colors.inputPLText}
              fontSize={12}
            />
          )}
        </View>

        <View
          marginTop={-2}
          flex={1}
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between">
          <Text
            text={
              deciphered_text ||
              `Send a message to ${recipient_info?.full_name}...`
            }
            color={colors.inputPLText}
            limit={120}
            fontSize={14}
            flex={1}
          />
          {last_message_info?.data ? (
            <>
              {typeof last_message_info?.unread === 'number' &&
              last_message_info?.unread > 0 ? (
                <View
                  width={20}
                  height={20}
                  borderRadius={20}
                  backgroundColor={colors.primaryAlpha}
                  alignSelf="flex-start"
                  justifyContent="center"
                  alignItems="center">
                  <Text
                    text={
                      last_message_info?.unread > 9
                        ? '9+'
                        : last_message_info?.unread.toString()
                    }
                    fontSize={11}
                    color={colors.primary}
                    textAlign="center"
                    fontFamily={fonts.primaryFont_700}
                  />
                </View>
              ) : (
                <Icon
                  name={
                    last_message_info?.status === 'U' ? 'tick' : 'double-tick'
                  }
                  size={last_message_info?.status === 'U' ? 14 : 24}
                  style={TICK_STYLE}
                />
              )}
            </>
          ) : (
            <View
              width={26}
              height={16}
              borderRadius={4}
              backgroundColor={colors.primaryAlpha}
              alignSelf="flex-start"
              justifyContent="center"
              alignItems="center">
              <Text
                text={'New'}
                fontSize={10}
                color={colors.primary}
                textAlign="center"
              />
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}
