import { StyleProp, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

import camera from '../../assets/svg/camera.svg';
import close from '../../assets/svg/close.svg';
import gallery from '../../assets/svg/gallery.svg';
import pwdOff from '../../assets/svg/pwd-off.svg';
import pwdOn from '../../assets/svg/pwd-on.svg';

export const ICONS = {
  camera: camera,
  close: close,
  gallery: gallery,
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
