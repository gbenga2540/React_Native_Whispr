import { StyleProp, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

import addStory from '../../assets/svg/add-story.svg';
import camera from '../../assets/svg/camera.svg';
import close from '../../assets/svg/close.svg';
import gallery from '../../assets/svg/gallery.svg';
import newConversation from '../../assets/svg/new-conversation.svg';
import pwdOff from '../../assets/svg/pwd-off.svg';
import pwdOn from '../../assets/svg/pwd-on.svg';
import search from '../../assets/svg/search.svg';

export const ICONS = {
  'add-story': addStory,
  camera: camera,
  close: close,
  gallery: gallery,
  'new-conversation': newConversation,
  'pwd-off': pwdOff,
  'pwd-on': pwdOn,
  search: search,
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
