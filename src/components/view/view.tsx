import React from 'react';
import { View as DefaultView, ViewStyle } from 'react-native';
import { ViewProps } from './view.props';

export function View({ children, ...props }: ViewProps): React.JSX.Element {
  const VIEW: ViewStyle = {
    ...props,
  };

  return <DefaultView style={VIEW}>{children}</DefaultView>;
}
