import { Dispatch, SetStateAction } from 'react';
import {
  TextInputProps as DefaultTIProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

/**
 * TextField Props with an optional style override
 */
export interface TextFieldProps extends DefaultTIProps, Partial<ViewStyle> {
  /**
   * value of the text
   */
  value: string;

  /**
   * used to update the value of the text
   */
  setValue: Dispatch<SetStateAction<string>>;

  /**
   * An optional style override for the Text
   */
  textStyle?: TextStyle;

  /**
   * Is this a password field?
   */
  isPassword?: boolean;

  /**
   * Text field left component/child
   */
  leftChild?: React.ReactNode;

  /**
   * Text field right component/child
   */
  rightChild?: React.ReactNode;

  /**
   * Height for the search container
   */
  containerHeight?: number;
}
