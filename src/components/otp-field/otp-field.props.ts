import { Dispatch, SetStateAction } from 'react';
import {
  TextInputProps as DefaultTIProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

/**
 * TextField Props with an optional style override
 */
export interface OTPFieldProps extends DefaultTIProps, Partial<ViewStyle> {
  /**
   * number of text-field inputs
   */
  otpCount?: number;

  /**
   * value of the text
   */
  otpValue: string[];

  /**
   * used to update the value of the text
   */
  setOTPValue: Dispatch<SetStateAction<string[]>>;

  /**
   * An optional style override for the Text
   */
  textStyle?: TextStyle;

  /**
   * An optional style override for the borderColor on Focus
   */
  focusColor?: TextStyle['borderColor'];
}
