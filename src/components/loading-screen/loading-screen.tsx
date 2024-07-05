import React from 'react';
import { ActivityIndicator } from 'react-native';
import { colors } from 'src/design-system';
import { Screen, Text, View } from 'src/components';
import { LoadingScreenProps } from './loading-screen.props';

export function LoadingScreen({
  hide,
  loadText,
  textStyle,
  ...props
}: LoadingScreenProps): React.JSX.Element | null {
  if (hide) {
    return null;
  }

  return (
    <Screen preset="fixed">
      <View flex={1} justifyContent="center" alignItems="center">
        {loadText && (
          <Text
            text={loadText}
            marginBottom={4}
            color={colors.linkText}
            {...textStyle}
          />
        )}
        <ActivityIndicator color={colors.grayText} {...props} />
      </View>
    </Screen>
  );
}
