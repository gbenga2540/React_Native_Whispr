import { ActivityIndicatorProps, TextStyle } from 'react-native';

/**
 * ActivityIndicator Props with an optional style override
 */
export interface LoadingScreenProps extends ActivityIndicatorProps {
  /**
   * Hides the loading screen
   */
  hide?: boolean;

  /**
   * text to show
   */
  loadText?: string;

  /**
   * text style
   */
  textStyle?: TextStyle;
}
