import * as React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { buttonPresets, textPresets } from './button.presets';
import { ButtonProps } from './button.props';
import { colors } from 'src/design-system';

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps): React.JSX.Element {
  const {
    preset = 'primary',
    text,
    textStyle: textStyleOverride,
    children,
    isLoading,
    ...rest
  } = props;

  const disabledStyle: ViewStyle =
    props.disabled || isLoading ? { opacity: 0.3 } : {};

  const textStyles: StyleProp<TextStyle>[] = [
    textPresets[preset],
    textStyleOverride,
  ];

  const buttonStyles: StyleProp<ViewStyle>[] = [
    buttonPresets[preset],
    { ...rest },
    disabledStyle,
  ];

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={buttonStyles}
      disabled={props.disabled || isLoading}
      {...rest}>
      {isLoading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        children || <Text style={textStyles}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}
