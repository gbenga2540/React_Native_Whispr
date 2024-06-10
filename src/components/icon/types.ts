import { StyleProp, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

import pwdOff from '../../assets/svg/pwd-off.svg';
import pwdOn from '../../assets/svg/pwd-on.svg';

export const ICONS = {
  'pwd-off': pwdOff,
  'pwd-on': pwdOn,
};

export type IconName = keyof typeof ICONS;

export interface IconProps extends SvgProps {
  name: IconName;
  size?: number;
  style?: StyleProp<ViewStyle>;
  color?: string;
  stroke?: string;
  iconOpacity?: number;
  strokeWidth?: number;
  focused?: boolean;
  outline?: boolean;
}

export type Props = IconProps;
