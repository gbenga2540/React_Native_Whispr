import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Screen, Text, View } from 'src/components';
import { LoadingScreenProps } from './loading-screen.props';
import { useCustomTheme } from 'src/context/theme/interfaces';

export function LoadingScreen({
  hide,
  loadText,
  textStyle,
  ...props
}: LoadingScreenProps): React.JSX.Element | null {
  const { colors } = useCustomTheme();

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
            textAlign="center"
            color={colors.linkText}
            {...textStyle}
          />
        )}
        <ActivityIndicator color={colors.grayText} {...props} />
      </View>
    </Screen>
  );
}
