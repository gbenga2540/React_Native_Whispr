import { TouchableOpacityProps, ViewStyle } from 'react-native';

/**
 * Pressable Props with an optional style override
 */
export interface PressableProps
  extends TouchableOpacityProps,
    Partial<ViewStyle> {
  /**
   * The components to pass into the Pressable
   */
  children: React.ReactNode;
}
