import React from 'react';
import { MessageBoxProps } from './message-box.props';
import { useCustomTheme } from 'src/context/theme/interfaces';
import { Icon, Pressable, Text, View } from 'src/components';
import TimeAgo from 'javascript-time-ago';
import { useAuthStore } from 'src/store/auth/auth.store';
import { TextStyle } from 'react-native';

const BORDER_RADIUS: number = 10;
export function MessageBox({
  data,
  createdAt,
  sender_id,
}: MessageBoxProps): React.JSX.Element {
  const user = useAuthStore().auth;
  const { colors } = useCustomTheme();
  const timeAgo = new TimeAgo('en-US');

  const is_user: boolean = user?.user?.user_id === sender_id;

  const TICK_STYLE: TextStyle = {
    color: colors.primary,
    marginLeft: 'auto',
    marginTop: 3,
  };

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
          text={data || ''}
          color={is_user ? colors.grayText : colors.white}
          fontSize={15}
        />

        {is_user && <Icon name="tick" style={TICK_STYLE} size={14} />}
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
