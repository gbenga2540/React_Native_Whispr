import { Dispatch, SetStateAction } from 'react';
import { TouchableOpacityProps, ViewStyle } from 'react-native';

export interface CheckBoxProps
  extends TouchableOpacityProps,
    Partial<ViewStyle> {
  toggle?: boolean;
  setToggle?: Dispatch<SetStateAction<boolean>>;
  externalOverride?: boolean;
  onPress?: () => void;
  innerStyle?: ViewStyle;
}
