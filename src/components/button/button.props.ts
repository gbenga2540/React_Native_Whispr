import {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { buttonPresetsType } from './button.presets';

/**
 * Button Props with an optional style override useful for the buttons
 */
export interface ButtonProps extends TouchableOpacityProps, Partial<ViewStyle> {
  /**
   * The text to display .
   */
  text?: string;

  /**
   * An optional style override useful for fontFamily and fontSize
   */
  textStyle?: StyleProp<TextStyle>;

  /**
   * One of the different types of text presets.
   */
  preset?: buttonPresetsType;

  /**
   * Optional component wrapped with the button
   */
  children?: React.ReactNode;

  /**
   * Show activity indicator in the button
   */
  isLoading?: boolean;
}
