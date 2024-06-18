import { TextStyle, ViewStyle } from 'react-native';

/**
 * Divider Props with an optional style override for the container
 */
export interface DividerProps extends Partial<ViewStyle> {
  /**
   * The text to display .
   */
  text?: string;

  /**
   * An optional style override useful for fontFamily and fontSize
   */
  textStyle?: TextStyle;

  /**
   * An optional style override useful for the dividers
   */
  dividerStyle?: ViewStyle;
}
