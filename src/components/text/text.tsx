import React from 'react';
import { Text as DefaultText, TextStyle } from 'react-native';
import { TextProps } from './text.props';
import { colors, getComputedWidth } from 'src/design-system';
import { fonts } from 'src/assets/fonts/fonts';

export function Text({ text, ...props }: TextProps): React.JSX.Element {
  const TEXT: TextStyle = {
    color: colors.grayText,
    fontFamily: fonts.primaryFont_400,
    ...props,
    fontSize: getComputedWidth(props.fontSize || 16),
  };

  return <DefaultText style={TEXT}>{text}</DefaultText>;
}
