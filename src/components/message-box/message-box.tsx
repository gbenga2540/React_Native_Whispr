import React, { useEffect } from 'react';
import { MessageBoxProps } from './message-box.props';
import { useCustomTheme } from 'src/context/theme/interfaces';
import { Icon, Pressable, Text, View } from 'src/components';
import TimeAgo from 'javascript-time-ago';
import { TextStyle } from 'react-native';
import MessageCipher from 'src/helpers/crypto/crypto';
import { useAuth } from 'src/context/auth/interfaces';
import { useSocket } from 'src/context/socket/interfaces';
import { IMessage } from 'src/interface/message';

const BORDER_RADIUS: number = 10;
export function MessageBox({
  data,
  createdAt,
  sender_id,
  status,
  chat_recipient_id,
  type,
  _id,
  chat_id,
  updatedAt,
}: MessageBoxProps): React.JSX.Element {
  const auth = useAuth().auth;
  const { colors } = useCustomTheme();
  const socket = useSocket().socket;
  const timeAgo = new TimeAgo('en-US');

  const is_user: boolean = auth?.user?.user_id === sender_id;

  const TICK_STYLE_NOT_SENT: TextStyle = {
    color: colors.inputPLText,
    alignSelf: 'flex-start',
    marginLeft: 'auto',
    marginTop: 3,
    marginRight: -3,
  };
  const TICK_STYLE: TextStyle = {
    color: status === 'R' ? colors.primary : colors.inputPLText,
    marginLeft: 'auto',
    marginTop: 3,
    marginBottom: status === 'U' ? 0 : -4,
    marginRight: status === 'U' ? 0 : -5,
  };

  const cipherKey = MessageCipher.generateCipherKey(
    sender_id!,
    is_user ? chat_recipient_id : auth?.user?.user_id!,
  );

  const decipheredText =
    type === 'Text' ? MessageCipher.decipherMessage(data!, cipherKey) : '';

  useEffect(() => {
    if (!socket || status === 'N') {
      return;
    }

    if (status !== 'R' && sender_id !== auth?.user?.user_id) {
      socket.emit('on_message_read', {
        _id,
        chat_id,
        createdAt,
        data,
        sender_id,
        status,
        type,
        updatedAt,
      } as IMessage);
    }
  }, [
    socket,
    _id,
    chat_id,
    createdAt,
    data,
    sender_id,
    status,
    type,
    updatedAt,
    auth?.user?.user_id,
  ]);

  return (
    <Pressable
      marginLeft={is_user ? 'auto' : undefined}
      marginBottom={17}
      minWidth={'75%'}
      maxWidth={'75%'}>
      <View
        minHeight={50}
        flex={1}
        paddingHorizontal={10}
        paddingTop={10}
        paddingBottom={is_user ? 6 : 10}
        borderRadius={BORDER_RADIUS}
        borderWidth={is_user ? 1 : undefined}
        borderColor={is_user ? colors.ddInputBackground : undefined}
        borderBottomLeftRadius={is_user ? BORDER_RADIUS : 0}
        borderBottomRightRadius={is_user ? 0 : BORDER_RADIUS}
        backgroundColor={is_user ? undefined : colors.primary}>
        <Text
          text={decipheredText || ''}
          color={is_user ? colors.grayText : colors.white}
          fontSize={15}
        />

        {is_user &&
          (status === 'N' ? (
            <Icon
              name={'not-sent'}
              size={14}
              style={TICK_STYLE_NOT_SENT}
              fill={colors.inputPLText}
            />
          ) : (
            <Icon
              name={status === 'U' ? 'tick' : 'double-tick'}
              size={status === 'U' ? 14 : 24}
              style={TICK_STYLE}
            />
          ))}
      </View>

      {createdAt && (
        <Text
          marginLeft={is_user ? undefined : 'auto'}
          text={timeAgo.format(new Date(createdAt || '').getTime())}
          color={colors.inputPLText}
          fontSize={13}
        />
      )}
    </Pressable>
  );
}
