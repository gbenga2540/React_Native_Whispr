import { ViewProps as DefaultViewProps, ViewStyle } from 'react-native';

/**
 * View Props with an optional style override
 */
export interface ViewProps extends DefaultViewProps, Partial<ViewStyle> {
  /**
   * The components to pass into the View
   */
  children: React.ReactNode;
}
