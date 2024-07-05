import React from 'react';
import { Text, View } from '..';
import { DividerProps } from './divider.props';
import { TextStyle, ViewStyle } from 'react-native';
import { useCustomTheme } from 'src/context/theme/interfaces';

export function Divider({
  text,
  textStyle,
  dividerStyle,
  ...rest
}: DividerProps): React.JSX.Element {
  const { colors } = useCustomTheme();

  const overrideTextStyle: TextStyle = {
    color: colors.grayText,
    marginHorizontal: 10,
    ...textStyle,
  };

  const overrideDividerStyle: ViewStyle = {
    height: 2,
    backgroundColor: colors.inputBackground,
    flex: 1,
    ...dividerStyle,
  };
  return (
    <View
      marginVertical={30}
      flex={1}
      flexDirection="row"
      alignItems="center"
      {...rest}>
      <View children={null} {...overrideDividerStyle} />
      <Text text={text || 'or'} {...overrideTextStyle} />
      <View children={null} {...overrideDividerStyle} />
    </View>
  );
}
