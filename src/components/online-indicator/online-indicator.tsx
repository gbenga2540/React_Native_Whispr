import React from 'react';
import { OnlineIndicatorProps } from './online-indicator.props';
import { useCustomTheme } from 'src/context/theme/interfaces';
import { View } from '../view/view';

export function OnlineIndicator({
  online,
  innerSize,
  outerSize,
  topOffset,
  rightOffset,
}: OnlineIndicatorProps): React.JSX.Element {
  const { colors } = useCustomTheme();

  return (
    <View
      position="absolute"
      backgroundColor={colors.background}
      width={outerSize || 16}
      height={outerSize || 16}
      borderRadius={outerSize || 8}
      right={topOffset || -4}
      top={rightOffset || -4}
      justifyContent="center"
      alignItems="center">
      <View
        width={innerSize || 10}
        height={innerSize || 10}
        borderRadius={innerSize || 10}
        children={null}
        backgroundColor={online ? colors.green : colors.inputPLText}
      />
    </View>
  );
}
