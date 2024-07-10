import React from 'react';
import { CheckBoxProps } from './check-box.props';
import { useCustomTheme } from 'src/context/theme/interfaces';
import { Pressable, View } from 'src/components';
import { ViewStyle } from 'react-native';

export function CheckBox({
  toggle,
  setToggle,
  externalOverride = false,
  onPress,
  innerStyle,
  ...props
}: CheckBoxProps): React.JSX.Element {
  const { colors } = useCustomTheme();

  const handleOnPress = () => {
    if (externalOverride) {
      onPress !== undefined && onPress();
    } else {
      setToggle !== undefined && setToggle(!toggle);
    }
  };

  const STYLE: ViewStyle = {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 4,
    padding: 2.5,
    borderColor: props.disabled
      ? colors.inputPLText
      : toggle
      ? colors.primary
      : colors.inputPLText,
    ...props,
  };

  const INNER_STYLE: ViewStyle = {
    backgroundColor: props.disabled
      ? colors.inputPLText
      : toggle
      ? colors.primary
      : colors.inputPLText,
    flex: 1,
    borderRadius: 2,
    ...innerStyle,
  };

  return (
    <Pressable {...STYLE} onPress={handleOnPress} {...props}>
      {toggle && <View {...INNER_STYLE}>{''}</View>}
    </Pressable>
  );
}
