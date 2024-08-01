import React from 'react';
import { MessageBoxProps } from './message-box.props';
import { useCustomTheme } from 'src/context/theme/interfaces';
import { Icon, Pressable, Text, View } from 'src/components';
import TimeAgo from 'javascript-time-ago';
import { useAuthStore } from 'src/store/auth/auth.store';
import { TextStyle } from 'react-native';
import { MessageCipher } from 'src/helpers/crypto/crypto';

const BORDER_RADIUS: number = 10;
export function MessageBox({
  data,
  createdAt,
  sender_id,
  status,
  chat_recipient_id,
  type,
}: MessageBoxProps): React.JSX.Element {
  const user = useAuthStore().auth;
  const { colors } = useCustomTheme();
  const timeAgo = new TimeAgo('en-US');

  const is_user: boolean = user?.user?.user_id === sender_id;

  const TICK_STYLE: TextStyle = {
    color: status === 'R' ? colors.primary : colors.inputPLText,
    marginLeft: 'auto',
    marginTop: 3,
    marginBottom: status === 'U' ? 0 : -4,
    marginRight: status === 'U' ? 0 : -5,
  };

  const messageCipher = new MessageCipher();
  const cipherKey = messageCipher.generateCipherKey(
    String(sender_id),
    is_user ? chat_recipient_id : String(user?.user?.user_id),
  );

  const deciphered_text =
    type === 'Text'
      ? messageCipher.decipherMessage(String(data), cipherKey)
      : '';

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
          text={deciphered_text || ''}
          color={is_user ? colors.grayText : colors.white}
          fontSize={15}
        />

        {is_user && (
          <Icon
            name={status === 'U' ? 'tick' : 'double-tick'}
            size={status === 'U' ? 14 : 24}
            style={TICK_STYLE}
          />
        )}
      </View>

      <Text
        marginLeft={is_user ? undefined : 'auto'}
        text={timeAgo.format(new Date(createdAt || ''))}
        color={colors.inputPLText}
        fontSize={13}
      />
    </Pressable>
  );
}
