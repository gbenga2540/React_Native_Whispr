import { Dispatch, SetStateAction } from 'react';
import { TouchableOpacityProps, ViewStyle } from 'react-native';

export interface ToggleButtonProps
  extends TouchableOpacityProps,
    Partial<ViewStyle> {
  toggle: boolean;
  setToggle?: Dispatch<SetStateAction<boolean>>;
  onUpdate?: (toggle: boolean) => void;
  externalOverride?: boolean;
}
