import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { PressableProps } from './pressable.props';

export function Pressable({
  children,
  ...props
}: PressableProps): React.JSX.Element {
  const STYLE: ViewStyle = {
    ...props,
  };

  return (
    <TouchableOpacity
      activeOpacity={props.activeOpacity || 0.65}
      {...props}
      style={STYLE}>
      {children}
    </TouchableOpacity>
  );
}
