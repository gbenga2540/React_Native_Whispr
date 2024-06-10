import { TextProps as DefaultTextProps, TextStyle } from 'react-native';

export interface TextProps extends DefaultTextProps, Partial<TextStyle> {
  /**
   * The text to display .
   */
  text: string;
}
