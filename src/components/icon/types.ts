import { StyleProp, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

import addStory from '../../assets/svg/add-story.svg';
import backBtn from '../../assets/svg/back-btn.svg';
import camera from '../../assets/svg/camera.svg';
import close from '../../assets/svg/close.svg';
import gallery from '../../assets/svg/gallery.svg';
import newConversation from '../../assets/svg/new-conversation.svg';
import pwdOff from '../../assets/svg/pwd-off.svg';
import pwdOn from '../../assets/svg/pwd-on.svg';
import search from '../../assets/svg/search.svg';
import sendBtn from '../../assets/svg/send-btn.svg';
import tick from '../../assets/svg/tick.svg';
import videoCall from '../../assets/svg/video-call.svg';
import voiceCall from '../../assets/svg/voice-call.svg';

export const ICONS = {
  'add-story': addStory,
  'back-btn': backBtn,
  camera: camera,
  close: close,
  gallery: gallery,
  'new-conversation': newConversation,
  'pwd-off': pwdOff,
  'pwd-on': pwdOn,
  search: search,
  'send-btn': sendBtn,
  tick: tick,
  'video-call': videoCall,
  'voice-call': voiceCall,
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
