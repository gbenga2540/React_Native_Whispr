import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useCustomTheme } from 'src/context/theme/interfaces';
import { ToggleButtonProps } from './toggle-button.props';
import { Pressable } from 'src/components';
import { ViewStyle } from 'react-native';

export function ToggleButton({
  toggle,
  setToggle,
  onUpdate,
  externalOverride,
  ...props
}: ToggleButtonProps): React.JSX.Element {
  const { colors } = useCustomTheme();

  const toggleAnim = useSharedValue(0);

  useEffect(() => {
    if (toggle) {
      toggleAnim.value = withTiming(13, {
        duration: 200,
      });
    } else {
      toggleAnim.value = withTiming(0, {
        duration: 200,
      });
    }
  }, [toggleAnim, toggle]);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      marginLeft: toggleAnim.value,
      height: 12,
      width: 12,
      borderRadius: 12,
      backgroundColor: colors.background,
    };
  }, []);

  const handleOnPress = () => {
    if (externalOverride) {
      onUpdate !== undefined && onUpdate(!toggle);
    } else {
      onUpdate !== undefined && onUpdate(!toggle);
      setToggle !== undefined && setToggle(!toggle);
    }
  };

  const STYLE: ViewStyle = {
    width: 32,
    height: 19,
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 4,
    backgroundColor: props.disabled
      ? colors.inputPLText
      : toggle
      ? colors.primary
      : colors.inputPLText,
    ...props,
  };

  return (
    <Pressable {...props} onPress={handleOnPress} {...STYLE}>
      <Animated.View style={reanimatedStyle} />
    </Pressable>
  );
}
